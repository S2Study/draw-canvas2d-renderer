import Stroke = drawchat.Stroke;
import Fill = drawchat.Fill;

import {FillUtil} from "./FillUtil";

export class StrokeUtil{

	static STROKE_COLOR_DEFAULT:string = "#FFF";

	/**
	 * 線スタイルの設定。
	 * @param context
	 * @param stroke
	 */
	static setStroke(
		context:CanvasRenderingContext2D,
		stroke:Stroke
	):void{

		//	塗りスタイル
		StrokeUtil.setStrokeFill(context,stroke.fillStyle);

		//	破線( offsetは未対応)
		if(stroke.dash && stroke.dash.segments){
			context.setLineDash(stroke.dash.segments);
		}else{
			context.setLineDash([]);
		}

		//
		let style = stroke.style;
		if(!style){
			context.lineWidth = 1;
			context.lineCap = "round";
			context.lineJoin = "round";
			context.miterLimit =  10.0;
			return;
		}

		//	太さ
		if(style.thickness){
			context.lineWidth = style.thickness;
		}else{
			context.lineWidth = 1;
		}

		//	lineCap
		StrokeUtil.setLineCap(context,style.caps);

		//	miter
		StrokeUtil.setJoints(context,style.joints);

		//	miterLimit
		if(!style.miterLimit){
			context.miterLimit = 10.0;
			return;
		}
		context.miterLimit = style.miterLimit;
	}

	private static setLineCap(
		context:CanvasRenderingContext2D,
		lineCap:number
	):void{
		if(!lineCap){
			context.lineCap = "round";
			return;
		}
		switch(lineCap){
			case 0:
				context.lineCap = "butt";
				break;
			case 1:
				context.lineCap = "round";
				break;
			case 2:
				context.lineCap = "square";
				break;
		}
	}

	private static setJoints(
		context:CanvasRenderingContext2D,
		joints:number
	):void{
		if(!joints){
			context.lineJoin = "round";
			return;
		}
		switch(joints){
			case 0:
				context.lineJoin = "miter";
				break;
			case 1:
				context.lineJoin = "round";
				break;
			case 2:
				context.lineJoin = "bevel";
				break;
		}
	}

	/**
	 * 線スタイルの設定。
	 * @param context
	 * @param fill
	 */
	private static setStrokeFill(
		context:CanvasRenderingContext2D,
		fill?:Fill
	):void{

		//	指定なし（デフォルト）
		if(!fill){
			context.strokeStyle = StrokeUtil.STROKE_COLOR_DEFAULT;
			return;
		}

		//	ベタ塗り
		if(fill.color){
			context.strokeStyle = fill.color;
			return;
		}

		//	線形グラデーション
		if(fill.linerGradient){
			context.strokeStyle = FillUtil.createLineGradient(context,fill.linerGradient);
			return;
		}

		//	円形グラデーション
		if(fill.radialGradient){
			context.strokeStyle = FillUtil.createRadialGradient(context,fill.radialGradient);
			return;
		}
		context.strokeStyle = StrokeUtil.STROKE_COLOR_DEFAULT;
	}
}