import Graphic = drawchat.Graphic;
import GraphicsDraw = drawchat.GraphicsDraw;

import {FillUtil} from "./FillUtil";
import {StrokeUtil} from "./StrokeUtil";
import {PathUtil} from "./PathUtil";
import {TransformContainer} from "./TransformContainer";
import {CompositeOperationUtil} from "./CompositeOperationUtil";
export class GraphicsUtil{

	static renderGraphics(
		context:CanvasRenderingContext2D,
		transform:TransformContainer,
		graphics:GraphicsDraw
	):void{

		//transform
		transform.setTransform(context,graphics.transform);

		//compositeOperation:number;
		CompositeOperationUtil.setCompositeOperation(context,graphics.compositeOperation);

		for(let graphic of graphics.graphics){
			GraphicsUtil.renderGraphic(context,graphic);
		}
	}

	private static renderGraphic(
		context:CanvasRenderingContext2D,
		graphics:Graphic
	):void{

		//fill
		if(graphics.fill){
			FillUtil.setFill(context,graphics.fill);
		}

		//stroke
		if(graphics.stroke){
			StrokeUtil.setStroke(context,graphics.stroke);
		}

		//path
		// console.log('drawPathArray :' + JSON.stringify(graphics.path,null,"  "));
		context.beginPath();
		PathUtil.drawPathArray(context,graphics.path);

		//fill
		if(graphics.fill){
			context.closePath();
			context.fill();
		}

		//stroke
		if(graphics.stroke){
			context.stroke();
		}
	}
}