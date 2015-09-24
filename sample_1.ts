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
	export class DemoIconsWorld {

		private matrixLength:number = 8;

		constructor() {
			this.setup();
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
			for (var i = 0, len = this.matrixLength * this.matrixLength; i < len; i++) {
				var text2:createjs.Text = new createjs.Text("あ", "200px serif", "#f00");
				text2.textBaseline = "middle";
				text2.textAlign = "center";
				text2.x = SIZE * (i % this.matrixLength) + SIZE / 2;
				text2.y = SIZE * Math.floor(i / this.matrixLength) + SIZE / 2;
				container.addChild(text2);
			}

			// CreateJS で画像に変換する
			container.cache(0, 0, SIZE * this.matrixLength, SIZE * this.matrixLength);
			var cacheUrl:string = container.getCacheDataURL();
			var image = new Image();
			image.src = cacheUrl;

			// body 要素に追加する
			document.body.appendChild(image);
		}
	}
}

