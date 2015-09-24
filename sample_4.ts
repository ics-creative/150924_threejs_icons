///<reference path="threejs/three.d.ts" />
///<reference path="BasicView.ts" />
///<reference path="easeljs/easeljs.d.ts" />
///<reference path="tweenjs/tweenjs.d.ts" />
///<reference path="greensock/greensock.d.ts" />

declare var WebFont;

window.addEventListener("load", ()=> {
	new demo.DemoIconsWorld();
});

module demo {

	/**
	 * 3Dのパーティクル表現のクラスです。
	 * @author Yausnobu Ikeda a.k.a clockmaker
	 */
	export class DemoIconsWorld extends demo.BasicView {

		private CANVAS_W:number = 250;
		private CANVAS_H:number = 40;
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

			this._particleList = [];
			for (var i = 0; i < this.CANVAS_W; i++) {
				for (var j = 0; j < this.CANVAS_H; j++) {

					var geometry = new THREE.PlaneGeometry(40, 40, 1, 1);

					var material = new THREE.MeshLambertMaterial({
						color: 0xff0000,
						transparent: true,
						side: THREE.DoubleSide
					});

					var word:THREE.Mesh = new THREE.Mesh(geometry, material);

					word.position.x = 10000 * (Math.random() - 0.5);
					word.position.y = 10000 * (Math.random() - 0.5);
					this._wrap.add(word);
					this._particleList.push(word);
				}
			}
		}

		public onTick():void {
			super.onTick();

			this.camera.position.x = 10000 * Math.sin(Date.now() / 1000);
			this.camera.position.z = 10000 * Math.cos(Date.now() / 1000);
			this.camera.lookAt(this.HELPER_ZERO);
		}
	}
}

