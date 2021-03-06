///<reference path="threejs/three.d.ts" />
///<reference path="BasicView.ts" />
///<reference path="easeljs/easeljs.d.ts" />
///<reference path="tweenjs/tweenjs.d.ts" />
///<reference path="greensock/greensock.d.ts" />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
window.addEventListener("load", function () {
    new demo.DemoIconsWorld();
});
var demo;
(function (demo) {
    /**
     * 3Dのパーティクル表現のクラスです。
     * @author Yausnobu Ikeda a.k.a clockmaker
     */
    var DemoIconsWorld = (function (_super) {
        __extends(DemoIconsWorld, _super);
        function DemoIconsWorld() {
            _super.call(this);
            this.CANVAS_W = 250;
            this.CANVAS_H = 40;
            this.WORD_LIST = ["WebGL", "HTML5", "three.js"];
            this._matrixLength = 8;
            this._particleList = [];
            this._wordIndex = 0;
            /** 色相 0.0〜1.0 */
            this._hue = 0.6;
            this.HELPER_ZERO = new THREE.Vector3(0, 0, 0);
            this.setup();
            this.startRendering();
        }
        /**
         * セットアップします。
         */
        DemoIconsWorld.prototype.setup = function () {
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
                    var word = new THREE.Mesh(geometry, material);
                    word.position.x = 10000 * (Math.random() - 0.5);
                    word.position.y = 10000 * (Math.random() - 0.5);
                    this._wrap.add(word);
                    this._particleList.push(word);
                }
            }
        };
        DemoIconsWorld.prototype.onTick = function () {
            _super.prototype.onTick.call(this);
            this.camera.position.x = 10000 * Math.sin(Date.now() / 1000);
            this.camera.position.z = 10000 * Math.cos(Date.now() / 1000);
            this.camera.lookAt(this.HELPER_ZERO);
        };
        return DemoIconsWorld;
    })(demo.BasicView);
    demo.DemoIconsWorld = DemoIconsWorld;
})(demo || (demo = {}));
//# sourceMappingURL=sample_4.js.map