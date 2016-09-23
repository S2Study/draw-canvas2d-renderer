/**
 * 複数レイヤーを合成して一枚の画像データURIを生成する。
 * @param width
 * @param height
 * @param backmostLayer
 * @param contextList
 * @returns {any}
 */
export function combine(
	width:number,
	height:number,
	backmostLayer:HTMLCanvasElement,
	contextList:CanvasRenderingContext2D[]
):string{

	if(contextList == null || contextList.length === 0){
		return null;
	}

	if(contextList.length === 1){
		return backmostLayer.toDataURL();
	}
	let backup = contextList[0].getImageData(0,0,width,height);
	let output = contextList[0].createImageData(width,height);

	let i = 0 | 0;
	let len = contextList.length;
	while(i < len){
		let image = contextList[i].getImageData(0,0,width,height);
		if(i === 0){
			updateColor(output,image);
			i = (i + 1) | 0;
			continue;
		}
		mergeColor(output,image);
		i = (i + 1) | 0;
	}

	contextList[0].putImageData(output,0,0);
	let result = backmostLayer.toDataURL();
	contextList[0].putImageData(backup,0,0);
	return result;
}

/**
 * 色データを上書きする。
 * @param target
 * @param addImage
 */
function updateColor(
	target:ImageData,
	addImage:ImageData
){

	let data = target.data;
	let updateData = addImage.data;
	let x = 0 | 0;
	let y = 0 | 0;
	let width = target.width | 0;
	let height = target.height | 0;
	let index = 0 | 0;

	while(x < width){
		while(y < height){
			index = ((x + y * width) * 4 )| 0;

			//	R
			data[index ] = updateData[index];

			//	G
			index = (index + 1) | 0;
			data[index ] = updateData[index];

			//	B
			index = (index + 1) | 0;
			data[index ] = updateData[index];

			//	α
			index = (index + 1) | 0;
			data[index ] = updateData[index];

			y = (y + 1)|0;
		}
		x = (x + 1)|0;
	}
}

function mergeColor(
	target:ImageData,
	addImage:ImageData
){

	let data = target.data;
	let addData = addImage.data;
	let x = 0 | 0;
	let y = 0 | 0;
	let width = target.width | 0;
	let height = target.height | 0;
	let index = 0 | 0;
	let alphaIndex = 0 | 0;
	let outAlpha = 0 | 0;

	//	アルファブレンドの実行
	while(x < width){
		while(y < height){

			index = ((x + y * width) * 4 )| 0;
			alphaIndex = (index + 3) | 0;

			//アルファ成分抽出
			outAlpha = (addData[alphaIndex] + data[alphaIndex] * (255 - addData[alphaIndex])) | 0;

			//	R
			data[index] = (addData[index] * addData[alphaIndex] + data[index] * data[alphaIndex]
				* (255 - addData[alphaIndex])) / ( outAlpha / 255) ;

			//	G
			index = (index + 1) | 0;
			data[index] = (addData[index] * addData[alphaIndex] + data[index] * data[alphaIndex]
				* (255 - addData[alphaIndex])) / ( outAlpha / 255) ;

			//	B
			index = (index + 1) | 0;
			data[index] = (addData[index] * addData[alphaIndex] + data[index] * data[alphaIndex]
				* (255 - addData[alphaIndex])) / ( outAlpha / 255) ;

			//	α
			index = (index + 1) | 0;
			data[index] = outAlpha;

			y = (y + 1)|0;
		}
		x = (x + 1)|0;
	}
}
export default combine;