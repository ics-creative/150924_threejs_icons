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

		private CANVAS_W:number = 10;
		private CANVAS_H:number = 10;
		private WORD_LIST = ["WebGL", "HTML5", "three.js"];
		private _matrixLength:number = 8;
		private _particleList = [];
		private _wrap:THREE.Object3D;
		private _wordIndex = 0;
		private _bg:THREE.Mesh;
		/** 色相 0.0〜1.0 */
		private _hue:number = 0.6;

		private HELPER_ZERO:THREE.Vector3 = new THREE.Vector3(0, 0, 0);

		constructor() {
			super();

			this.setup();
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
					word.position.x = 1000 * (Math.random() - 0.5);
					word.position.y = 1000 * (Math.random() - 0.5);
					this._wrap.add(word);
					this._particleList.push(word);
				}
			}
		}

		public onTick():void {
			super.onTick();

			this.camera.position.x = 1000 * Math.sin(Date.now() / 1000);
			this.camera.position.z = 1000 * Math.cos(Date.now() / 1000);
			this.camera.lookAt(this.HELPER_ZERO);
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

