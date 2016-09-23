import TextDraw = drawchat.TextDraw;
import Text = drawchat.Text;
import {FillUtil} from "./FillUtil";
import {StrokeUtil} from "./StrokeUtil";
import {TransformContainer} from "./TransformContainer";
import {CompositeOperationUtil} from "./CompositeOperationUtil";
export class TextUtil{

	static renderTextDraw(
		context:CanvasRenderingContext2D,
		transform:TransformContainer,
		textDraw:TextDraw
	):void{
		//transform
		transform.setTransform(context,textDraw.transform);
		//compositeOperation:number;
		CompositeOperationUtil.setCompositeOperation(context,textDraw.compositeOperation);
		//text
		TextUtil.renderText(context,textDraw.text);
	}

	private static renderText(
		context:CanvasRenderingContext2D,
		text:Text
	):void{

		if(!text.text || (!text.fill && !text.stroke)){
			return;
		}
		// fill
		if(text.fill){
			FillUtil.setFill(context,text.fill);
		}
		// stroke
		if(text.stroke){
			StrokeUtil.setStroke(context,text.stroke);
		}
		// align
		context.textAlign = text.align != null ? text.align : 'start';
		// baseline
		context.textBaseline = text.baseline != null ? text.baseline : 'alphabetic';

		//	font
		let fontList:string[] = [];
		TextUtil.setFontStyle(fontList,text.style);
		TextUtil.setFontWeight(fontList,text.weight);
		TextUtil.setFontSize(fontList,text.size);
		TextUtil.setFontFamily(fontList,text.fontFamily);
		context.font = fontList.join(' ');

		// text
		if(text.fill){
			context.fillText(text.text,text.x,text.y);
		}
		if(text.stroke){
			context.strokeText(text.text,text.x,text.y);
		}
	}

	private static setFontFamily(resultTo:string[],fontFamily:string):void{
		if(!fontFamily){
			resultTo.push('serif');
			return;
		}
		resultTo.push("'" + fontFamily + "'");
	}

	private static setFontSize(resultTo:string[],size:number):void{
		if(!size){
			resultTo.push('12px');
			return;
		}
		resultTo.push(size + 'px');
	}

	private static setFontStyle(resultTo:string[],style:number):void{
		if(!style){
			return;
		}
		switch (style){
			case 0:
				return;
			case 1:
				resultTo.push('italic');
				return;
			case 2:
				resultTo.push('oblique');
				return;
			default:
		}
		return;
	}

	private static setFontWeight(resultTo:string[],weight:number):void{
		if(!weight){
			return;
		}
		switch (weight){
			case 1:
				resultTo.push('100');
				return;
			case 2:
				resultTo.push('200');
				return;
			case 3:
				resultTo.push('300');
				return;
			case 4:
				return;
			case 5:
				resultTo.push('500');
				return;
			case 6:
				resultTo.push('600');
				return;
			case 7:
				resultTo.push('bold');
				return;
			case 8:
				resultTo.push('800');
				return;
			case 9:
				resultTo.push('900');
				return;
			default:
		}
	}
}