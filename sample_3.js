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
            this.CANVAS_W = 250;
            this.CANVAS_H = 40;
            this.createLogo();
        }
        /**
         * ロゴを生成し、モーションします。
         */
        DemoIconsWorld.prototype.createLogo = function () {
            // レターオブジェクトを生成します。
            var canvas = document.createElement("canvas");
            canvas.setAttribute("width", this.CANVAS_W + "px");
            canvas.setAttribute("height", this.CANVAS_H + "px");
            var stage = new createjs.Stage(canvas);
            var text1 = new createjs.Text("WebGL", "42px Source Code Pro", "#F00");
            text1.textAlign = "center";
            text1.x = this.CANVAS_W / 2;
            stage.addChild(text1);
            stage.update();
            // 画面に canvas 要素を追加する
            document.body.appendChild(canvas);
            canvas.style.background = "#000";
            var ctx = canvas.getContext("2d");
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
                    // 不透明ドットの数をカウント
                    if (flag == true)
                        existDotCount++;
                }
            }
        };
        return DemoIconsWorld;
    })();
    demo.DemoIconsWorld = DemoIconsWorld;
})(demo || (demo = {}));
//# sourceMappingURL=sample_3.js.map