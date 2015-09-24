///<reference path="threejs/three.d.ts" />
///<reference path="BasicView.ts" />
///<reference path="easeljs/easeljs.d.ts" />
///<reference path="tweenjs/tweenjs.d.ts" />
///<reference path="greensock/greensock.d.ts" />
window.addEventListener("load", function () {
    new demo.DemoIconsWorld();
});
var demo;
(function (demo) {
    /**
     * 3Dのパーティクル表現のクラスです。
     * @author Yausnobu Ikeda a.k.a clockmaker
     */
    var DemoIconsWorld = (function () {
        function DemoIconsWorld() {
            this.matrixLength = 8;
            this.setup();
        }
        /**
         * セットアップします。
         */
        DemoIconsWorld.prototype.setup = function () {
            // ------------------------------
            // パーティクルのテクスチャアトラスを生成
            // ------------------------------
            var container = new createjs.Container();
            var SIZE = 256;
            for (var i = 0, len = this.matrixLength * this.matrixLength; i < len; i++) {
                var text2 = new createjs.Text("い", "200px serif", "#f00");
                text2.textBaseline = "middle";
                text2.textAlign = "center";
                text2.x = SIZE * (i % this.matrixLength) + SIZE / 2;
                text2.y = SIZE * Math.floor(i / this.matrixLength) + SIZE / 2;
                container.addChild(text2);
            }
            // CreateJS で画像に変換する
            container.cache(0, 0, SIZE * this.matrixLength, SIZE * this.matrixLength);
            var cacheUrl = container.getCacheDataURL();
            var image = new Image();
            image.src = cacheUrl;
            // body 要素に追加する
            document.body.appendChild(image);
        };
        return DemoIconsWorld;
    })();
    demo.DemoIconsWorld = DemoIconsWorld;
})(demo || (demo = {}));
//# sourceMappingURL=sample_1.js.map