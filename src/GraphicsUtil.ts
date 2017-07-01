import * as drawchat from "@s2study/draw-api";

import Graphic = drawchat.structures.Graphic;
import GraphicsDraw = drawchat.structures.GraphicsDraw;

import {FillUtil} from "./FillUtil";
import {StrokeUtil} from "./StrokeUtil";
import {PathUtil} from "./PathUtil";
import {TransformContainer} from "./TransformContainer";
import {CompositeOperationUtil} from "./CompositeOperationUtil";
export class GraphicsUtil {

	static renderGraphics(
		context: CanvasRenderingContext2D,
		transform: TransformContainer,
		graphics: GraphicsDraw,
		dx: number,
		dy: number
	): void {

		// transform
		transform.setTransform(context, graphics.transform);

		// compositeOperation:number;
		CompositeOperationUtil.setCompositeOperation(context, graphics.compositeOperation);

		for (let graphic of graphics.graphics) {
			GraphicsUtil.renderGraphic(context, graphic, dx, dy);
		}
	}

	private static renderGraphic(
		context: CanvasRenderingContext2D,
		graphics: Graphic,
		dx: number,
		dy: number
	): void {

		// fill
		if (graphics.fill) {
			FillUtil.setFill(context, graphics.fill);
		}

		// stroke
		if (graphics.stroke) {
			StrokeUtil.setStroke(context, graphics.stroke);
		}

		// path
		context.beginPath();
		PathUtil.drawPathArray(context, graphics.path, dx, dy);

		// fill
		if (graphics.fill) {
			context.closePath();
			context.fill();
		}

		// stroke
		if (graphics.stroke) {
			context.stroke();
		}
	}
}