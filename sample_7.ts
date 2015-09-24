///<reference path="threejs/three.d.ts" />
///<reference path="BasicView.ts" />
///<reference path="easeljs/easeljs.d.ts" />
///<reference path="tweenjs/tweenjs.d.ts" />
///<reference path="greensock/greensock.d.ts" />

declare var WebFont;

window.addEventListener("load", ()=> {
	new demo.DemoIconsPreload();
});

module demo {

	/**
	 * 3Dのパーティクル表現のデモクラスです。プリロードしてから実行します。
	 * @author Yausnobu Ikeda a.k.a clockmaker
	 */
	export class DemoIconsPreload {
		constructor() {
			// ウェブフォントのロードを待ってから初期化
			WebFont.load({
				custom: {
					families: ['Source Code Pro', 'FontAwesome'],
					urls: [
						'http://fonts.googleapis.com/css?family=Source+Code+Pro:600',
						'http://netdna.bootstrapcdn.com/font-awesome/4.0.3/css/font-awesome.css'
					],
					testStrings: {
						'FontAwesome': '\uf001'
					}
				},
				// Web Fontが使用可能になったとき
				active: ()=> {
					new DemoIconsWorld();
				}
			});
		}
	}

	/**
	 * 3Dのパーティクル表現のクラスです。
	 * @author Yausnobu Ikeda a.k.a clockmaker
	 */
	export class DemoIconsWorld extends demo.BasicView {

		private CANVAS_W:number = 100;
		private CANVAS_H:number = 40;
		private WORD_LIST = ["WebGL"];
		private _matrixLength:number = 8;
		private _particleList = [];
		private _wrap:THREE.Object3D;
		private _wordIndex = 0;

		private HELPER_ZERO:THREE.Vector3 = new THREE.Vector3(0, 0, 0);

		constructor() {
			super();

			this.setup();
			this.createLogo();
			this.startRendering();
		}

		/**
		 * セットアップします。
		 */
		private setup():void {
			// ------------------------------
			// パーティクルのテクスチャアトラスを生成
			// ------------------------------
			var container = new createjs.Container();

			var SIZE = 256;
			for (var i = 0, len = this._matrixLength * this._matrixLength; i < len; i++) {
				var char = String.fromCharCode(61730 + i);
				var text2:createjs.Text = new createjs.Text(char, "200px FontAwesome", "#fff");
				text2.textBaseline = "middle";
				text2.textAlign = "center";
				text2.x = SIZE * (i % this._matrixLength) + SIZE / 2;
				text2.y = SIZE * Math.floor(i / this._matrixLength) + SIZE / 2;
				container.addChild(text2);
			}

			// CreateJS で画像に変換する
			container.cache(0, 0, SIZE * this._matrixLength, SIZE * this._matrixLength);
			var cacheUrl:string = container.getCacheDataURL();
			var image = new Image();
			image.src = cacheUrl;

			document.body.appendChild(image)

			var texture = new THREE.Texture(image);
			texture.needsUpdate = true;

			// ------------------------------
			// カメラの配置
			// ------------------------------
			this.camera.far = 100000;
			this.camera.near = 1;
			this.camera.position.z = 5000;
			this.camera.lookAt(this.HELPER_ZERO);

			// ------------------------------
			// 3D空間のパーツを配置
			// ------------------------------
			var light = new THREE.DirectionalLight(0xffffff);
			light.position.set(0, 1, +1).normalize();
			this.scene.add(light);

			// particle motion
			this._wrap = new THREE.Object3D();
			this.scene.add(this._wrap);

			// ------------------------------
			// パーティクルの作成
			// ------------------------------
			var ux = 1 / this._matrixLength;
			var uy = 1 / this._matrixLength;

			this._particleList = [];
			for (var i = 0; i < this.CANVAS_W; i++) {
				for (var j = 0; j < this.CANVAS_H; j++) {

					var ox = (this._matrixLength * Math.random()) >> 0;
					var oy = (this._matrixLength * Math.random()) >> 0;

					var geometry = new THREE.PlaneGeometry(40, 40, 1, 1);
					this.change_uvs(geometry, ux, uy, ox, oy);

					var material = new THREE.MeshLambertMaterial({
						color: 0xffffff,
						map: texture,
						transparent: true,
						side: THREE.DoubleSide
					});

					material.blending = THREE.AdditiveBlending;

					var word = new THREE.Mesh(geometry, material);
					this._wrap.add(word);
					this._particleList.push(word);
				}
			}
		}


		/**
		 * ロゴを生成し、モーションします。
		 */
		private createLogo():void {
			// レターオブジェクトを生成します。
			var canvas:HTMLCanvasElement = <HTMLCanvasElement> document.createElement("canvas");
			canvas.setAttribute("width", this.CANVAS_W + "px");
			canvas.setAttribute("height", this.CANVAS_H + "px");

			var stage = new createjs.Stage(canvas);
			var text1 = new createjs.Text(this.WORD_LIST[this._wordIndex], "36px Source Code Pro", "#F00");
			this._wordIndex++;
			if (this._wordIndex >= this.WORD_LIST.length) {
				this._wordIndex = 0;
			}

			text1.textAlign = "center";
			text1.x = this.CANVAS_W / 2;
			stage.addChild(text1);
			stage.update();

			var ctx = <CanvasRenderingContext2D>canvas.getContext("2d");

			for (var i = 0; i < this._particleList.length; i++) {
				this._particleList[i].visible = false;
			}

			// 透過領域を判定する
			var pixcelColors = ctx.getImageData(0, 0, this.CANVAS_W, this.CANVAS_H).data;
			var existDotList = [];
			var existDotCount = 0;
			for (var i = 0; i < this.CANVAS_W; i++) {
				existDotList[i] = [];
				for (var j = 0; j < this.CANVAS_H; j++) {
					// 透過しているか判定
					var flag = (pixcelColors[(i + j * this.CANVAS_W) * 4 + 3] == 0);
					existDotList[i][j] = flag;

					if (flag == true) existDotCount++;
				}
			}

			// TweenMaxのインスタンスを作成
			var timeline:TimelineMax = new TimelineMax();

			// レターのモーションを作成する
			var cnt = 0;
			for (var i = 0; i < this.CANVAS_W; i++) {
				for (var j = 0; j < this.CANVAS_H; j++) {

					// 透過していたらパスする
					if (existDotList[i][j] == true)
						continue;

					var word:THREE.Mesh = this._particleList[cnt];

					word.visible = true;
					this._wrap.add(word);


					var toObj = {
						x: (i - canvas.width / 2) * 30,
						y: (canvas.height / 2 - j) * 30,
						z: 0
					};

					var fromObj = {
						x: 2000 * (Math.random() - 0.5) - 500,
						y: 1000 * (Math.random() - 0.5),
						z: +10000
					};

					word.position.x = fromObj.x;
					word.position.y = fromObj.y;
					word.position.z = fromObj.z;

					var delay = (Cubic.easeInOut).getRatio(cnt / 1600) * 3.0 + 1.5 * Math.random();

					timeline.to(word.position,
						7.0,
						{
							x: toObj.x,
							y: toObj.y,
							z: toObj.z,
							delay: delay / 1.0,
							ease: Expo.easeInOut
						}, 0);

					cnt++;
				}
			}
		}

		public onTick():void {
			super.onTick();
		}


		/**
		 * ジオメトリ内のUVを変更します。
		 * @param geometry    {THREE.PlaneGeometry}
		 * @param unitx    {number}
		 * @param unity    {number}
		 * @param offsetx    {number}
		 * @param offsety    {number}
		 */
		private change_uvs(geometry:THREE.PlaneGeometry,
						   unitx:number, unity:number,
						   offsetx:number, offsety:number) {
			var faceVertexUvs = geometry.faceVertexUvs[0];
			for (var i = 0; i < faceVertexUvs.length; i++) {
				var uvs = faceVertexUvs[i];
				for (var j = 0; j < uvs.length; j++) {
					var uv = uvs[j];
					uv.x = ( uv.x + offsetx ) * unitx;
					uv.y = ( uv.y + offsety ) * unity;
				}
			}
		}
	}
}

