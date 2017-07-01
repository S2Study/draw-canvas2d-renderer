import * as drawchat from "@s2study/draw-api";

import PathItem = drawchat.structures.PathItem;
import MoveTo = drawchat.structures.MoveTo;
import ArcTo = drawchat.structures.ArcTo;
import QuadraticCurveTo = drawchat.structures.QuadraticCurveTo;
import LineTo = drawchat.structures.LineTo;
import BezierCurveTo = drawchat.structures.BezierCurveTo;
export class PathUtil {

	/**
	 * パスの配列を順に描画します。
	 * @param context
	 * @param items
	 * @param dx
	 * @param dy
	 */
	static drawPathArray(
		context: CanvasRenderingContext2D,
		items: PathItem[],
		dx: number,
		dy: number
	): void {

		if (!items || items.length === 0) {
			return;
		}
		for (let item of items) {
			PathUtil.drawPath(context, item, dx, dy);
		}
		// context.closePath();
	}

	/**
	 * パスを描画します。
	 * @param context
	 * @param item
	 * @param dx
	 * @param dy
	 */
	private static drawPath(
		context: CanvasRenderingContext2D,
		item: PathItem,
		dx: number,
		dy: number
	): void {

		switch (item.type) {

			// moveTo
			case 0:
				let moveTo = (<MoveTo>item);
				context.moveTo(
					dx + moveTo.x,
					dy + moveTo.y
				);
				break;

			// arcTo
			case 1:
				let arcTo = (<ArcTo>item);
				context.arcTo(
					dx + arcTo.x1,
					dy + arcTo.y1,
					dx + arcTo.x2,
					dy + arcTo.y2,
					arcTo.radius
				);
				break;

			// quadraticCurveTo
			case 2:
				let qCurveTo = (<QuadraticCurveTo>item);
				context.quadraticCurveTo(
					dx + qCurveTo.cpx,
					dy + qCurveTo.cpy,
					dx + qCurveTo.x,
					dy + qCurveTo.y
				);
				break;

			// lineTo
			case 3:
				let lineTo = (<LineTo>item);
				context.lineTo(
					dx + lineTo.x,
					dy + lineTo.y
				);
				break;

			// bezierCurveTo
			case 4:
				let bCurveTo = (<BezierCurveTo>item);
				context.bezierCurveTo(
					dx + bCurveTo.cpx1,
					dy + bCurveTo.cpy1,
					dx + bCurveTo.cpx2,
					dy + bCurveTo.cpy2,
					dx + bCurveTo.x,
					dy + bCurveTo.y
				);
				break;
		}
	}
}
