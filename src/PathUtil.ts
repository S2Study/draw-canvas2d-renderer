import PathItem = drawchat.PathItem;
import MoveTo = drawchat.MoveTo;
import ArcTo = drawchat.ArcTo;
import QuadraticCurveTo = drawchat.QuadraticCurveTo;
import LineTo = drawchat.LineTo;
import BezierCurveTo = drawchat.BezierCurveTo;
export class PathUtil{

	/**
	 * パスの配列を順に描画します。
	 * @param context
	 * @param items
	 */
	static drawPathArray(
		context:CanvasRenderingContext2D,
		items:PathItem[]
	):void{

		if(!items || items.length === 0){
			return;
		}
		for(let item of items){
			PathUtil.drawPath(context,item);
		}
		// context.closePath();
	}

	/**
	 * パスを描画します。
	 * @param context
	 * @param item
	 */
	private static drawPath(
		context:CanvasRenderingContext2D,
		item:PathItem
	):void{

		switch(item.type){

			//moveTo
			case 0:
				let moveTo = (<MoveTo>item);
				context.moveTo(
					moveTo.x,
					moveTo.y
				);
				break;

			//arcTo
			case 1:
				let arcTo = (<ArcTo>item);
				context.arcTo(
					arcTo.x1,
					arcTo.y1,
					arcTo.x2,
					arcTo.y2,
					arcTo.radius
				);
				break;

			//quadraticCurveTo
			case 2:
				let qCurveTo = (<QuadraticCurveTo>item);
				context.quadraticCurveTo(
					qCurveTo.cpx,
					qCurveTo.cpy,
					qCurveTo.x,
					qCurveTo.y
				);
				break;

			//lineTo
			case 3:
				let lineTo = (<LineTo>item);
				context.lineTo(lineTo.x,lineTo.y);
				break;

			//bezierCurveTo
			case 4:
				let bCurveTo = (<BezierCurveTo>item);
				context.bezierCurveTo(
					bCurveTo.cpx1,
					bCurveTo.cpy1,
					bCurveTo.cpx2,
					bCurveTo.cpy2,
					bCurveTo.x,
					bCurveTo.y
				);
				break;
		}
	}
}
