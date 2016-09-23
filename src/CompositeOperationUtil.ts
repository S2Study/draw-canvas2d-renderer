export class CompositeOperationUtil{

	private static COMPOSITE_OPERATIONS:{[key:string]:string} = {
		0:"source-over",
		1:"source-atop",
		2:"source-in",
		3:"source-out",
		4:"destination-atop",
		5:"destination-in",
		6:"destination-out",
		7:"destination-over",
		8:"lighter",
		9:"copy",
		10:"xor",
		11:"vendorName-operationName"
	};

	static setCompositeOperation(
		context:CanvasRenderingContext2D,
		compositeOperation:number
	){
		if(!compositeOperation){
			context.globalCompositeOperation
				=  CompositeOperationUtil.COMPOSITE_OPERATIONS[0];
			return;
		}
		context.globalCompositeOperation
			= CompositeOperationUtil.COMPOSITE_OPERATIONS[compositeOperation];
	}
}