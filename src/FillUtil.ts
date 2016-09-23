import Fill = drawchat.Fill;
import LinerGradient = drawchat.LinerGradient;
import RadialGradient = drawchat.RadialGradient;
export class FillUtil{

	static FILL_COLOR_DEFAULT:string = "#000";

	/**
	 * 塗りスタイルの設定。
	 * @param context
	 * @param fill
	 */
	static setFill(
		context:CanvasRenderingContext2D,
		fill:Fill
	):void{

		//	ベタ塗り
		if(fill.color){
			context.fillStyle = fill.color;
			return;
		}

		//	線形グラデーション
		if(fill.linerGradient){
			context.fillStyle = FillUtil.createLineGradient(context,fill.linerGradient);
			return;
		}

		if(fill.radialGradient){
			context.fillStyle = FillUtil.createRadialGradient(context,fill.radialGradient);
		}
		fill.color =  FillUtil.FILL_COLOR_DEFAULT;
	}

	/**
	 * 線形グラデーションの構築。
	 * @param context
	 * @param linerGradient
	 * @returns {CanvasGradient}
	 */
	static createLineGradient(
		context:CanvasRenderingContext2D,
		linerGradient:LinerGradient
	):CanvasGradient{
		let liner = context.createLinearGradient(
			linerGradient.x0,
			linerGradient.y0,
			linerGradient.x1,
			linerGradient.y1
		);
		if(!linerGradient.colorStops){
			return liner;
		}
		for(let stop of linerGradient.colorStops){
			liner.addColorStop(stop.offset,stop.color);
		}
		return liner;
	}

	/**
	 * 線形グラデーションの構築。
	 * @param context
	 * @param radialGradient
	 * @returns {CanvasGradient}
	 */
	static createRadialGradient(
		context:CanvasRenderingContext2D,
		radialGradient:RadialGradient
	):CanvasGradient{
		let radial = context.createRadialGradient(
			radialGradient.x0,
			radialGradient.y0,
			radialGradient.r0,
			radialGradient.x1,
			radialGradient.y1,
			radialGradient.r1
		);
		if(!radialGradient.colorStops){
			return radial;
		}
		for(let stop of radialGradient.colorStops){
			radial.addColorStop(stop.offset,stop.color);
		}
		return radial;
	}
}