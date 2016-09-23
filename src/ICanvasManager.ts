export interface ICanvasManager{

	/**
	 * 新しくCanvasElementを生成します。
	 */
	createCanvas():HTMLCanvasElement;

	/**
	 * 指定されたCanvasを親要素の最終子要素に追加する。
	 * DOMを利用しない場合、このメソッドの実装は不要。
	 * @param canvas
	 */
	appendChild(canvas:HTMLCanvasElement):void;

	/**
	 * 指定されたCanvasを親要素から削除。
	 * DOMを利用しない場合、このメソッドの実装は不要。
	 * @param canvas
	 */
	removeChild(canvas:HTMLCanvasElement):void;

	/**
	 * Canvasの幅を取得。
	 */
	getWidth():number;

	/**
	 * Canvasの高さを取得。
	 */
	getHeight():number;

	/**
	 * 親要素からCanvasを全て削除。
	 * DOMを利用しない場合、このメソッドの実装は不要。
	 */
	removeChildren():void;
}
