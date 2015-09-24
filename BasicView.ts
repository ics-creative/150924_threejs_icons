/// <reference path="threejs/three.d.ts" />

module demo {
	/**
	 * BasicView は、Three.js のプロジェクトを簡単にセットアップすることができるクラスです。
	 * シーン、カメラ、レンダラー、ビューポートのシンプルなテンプレートを提供しています。
	 * @author Yausunobu Ikeda a.k.a @clockmaker
	 * @class demo.BasicView
	 */
	export class BasicView {
		/** シーンオブジェクトです。 */
		public scene:THREE.Scene;
		/** カメラオブジェクトです。(PerspectiveCamera のみ) */
		public camera:THREE.PerspectiveCamera;
		/** レンダラーオブジェクトです。(WebGL のみ) */
		public renderer:THREE.WebGLRenderer;
		/** HTML　要素です。 */
		public containerElement:HTMLElement;

		constructor() {
			this.containerElement = document.createElement('div');
			document.body.appendChild(this.containerElement);

			this.scene = new THREE.Scene();

			this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 200000);
			this.camera.position.z = -1000;

			// アンチエイリアス設定有無
			var needAntialias = window.devicePixelRatio == 1.0;

			this.renderer = new THREE.WebGLRenderer({antialias: needAntialias});
			this.renderer.setClearColor(0x0);
			this.renderer.setPixelRatio(window.devicePixelRatio);
			this.renderer.setSize(window.innerWidth, window.innerHeight);
			this.containerElement.appendChild(this.renderer.domElement);

			window.addEventListener('resize', (e)=> {
				this.handleResize(e)
			}, false);
		}

		/**
		 * ウインドウリサイズ時のイベントハンドラーです。
		 * @param event
		 */
		protected handleResize(event):void {
			this.camera.aspect = window.innerWidth / window.innerHeight;
			this.camera.updateProjectionMatrix();

			this.renderer.setSize(window.innerWidth, window.innerHeight);
		}

		/**
		 * レンダリングを開始します。
		 */
		public startRendering() {
			this.update();
		}

		/**
		 * requestAnimationFrame で呼び出されるメソッドです。
		 * @private
		 */
		protected update() {
			requestAnimationFrame(this.update.bind(this));

			this.onTick();
			this.render();
		}

		/**
		 * レンダリングを即座に実行します。
		 */
		public render() {
			this.renderer.render(this.scene, this.camera);
		}

		/**
		 * 毎フレーム実行される関数です。
		 */
		public onTick() {
		}
	}
}