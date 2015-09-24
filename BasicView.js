/// <reference path="threejs/three.d.ts" />
var demo;
(function (demo) {
    /**
     * BasicView は、Three.js のプロジェクトを簡単にセットアップすることができるクラスです。
     * シーン、カメラ、レンダラー、ビューポートのシンプルなテンプレートを提供しています。
     * @author Yausunobu Ikeda a.k.a @clockmaker
     * @class demo.BasicView
     */
    var BasicView = (function () {
        function BasicView() {
            var _this = this;
            this.containerElement = document.createElement('div');
            document.body.appendChild(this.containerElement);
            this.scene = new THREE.Scene();
            this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 200000);
            this.camera.position.z = -1000;
            // アンチエイリアス設定有無
            var needAntialias = window.devicePixelRatio == 1.0;
            this.renderer = new THREE.WebGLRenderer({ antialias: needAntialias });
            this.renderer.setClearColor(0x0);
            this.renderer.setPixelRatio(window.devicePixelRatio);
            this.renderer.setSize(window.innerWidth, window.innerHeight);
            this.containerElement.appendChild(this.renderer.domElement);
            window.addEventListener('resize', function (e) {
                _this.handleResize(e);
            }, false);
        }
        /**
         * ウインドウリサイズ時のイベントハンドラーです。
         * @param event
         */
        BasicView.prototype.handleResize = function (event) {
            this.camera.aspect = window.innerWidth / window.innerHeight;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(window.innerWidth, window.innerHeight);
        };
        /**
         * レンダリングを開始します。
         */
        BasicView.prototype.startRendering = function () {
            this.update();
        };
        /**
         * requestAnimationFrame で呼び出されるメソッドです。
         * @private
         */
        BasicView.prototype.update = function () {
            requestAnimationFrame(this.update.bind(this));
            this.onTick();
            this.render();
        };
        /**
         * レンダリングを即座に実行します。
         */
        BasicView.prototype.render = function () {
            this.renderer.render(this.scene, this.camera);
        };
        /**
         * 毎フレーム実行される関数です。
         */
        BasicView.prototype.onTick = function () {
        };
        return BasicView;
    })();
    demo.BasicView = BasicView;
})(demo || (demo = {}));
//# sourceMappingURL=BasicView.js.map