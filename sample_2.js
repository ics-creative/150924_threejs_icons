///<reference path="threejs/three.d.ts" />
///<reference path="BasicView.ts" />
///<reference path="easeljs/easeljs.d.ts" />
///<reference path="tweenjs/tweenjs.d.ts" />
///<reference path="greensock/greensock.d.ts" />
window.addEventListener("load", function () {
    new demo.DemoIconsPreload();
});
var demo;
(function (demo) {
    /**
     * 3Dのパーティクル表現のデモクラスです。プリロードしてから実行します。
     * @author Yausnobu Ikeda a.k.a clockmaker
     */
    var DemoIconsPreload = (function () {
        function DemoIconsPreload() {
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
                active: function () {
                    new DemoIconsWorld();
                }
            });
        }
        return DemoIconsPreload;
    })();
    demo.DemoIconsPreload = DemoIconsPreload;
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
                var char = String.fromCharCode(61730 + i);
                var text2 = new createjs.Text(char, "200px FontAwesome", "#f00");
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
//# sourceMappingURL=sample_2.js.map