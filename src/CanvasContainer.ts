import * as CombineCanvasUtil from "./CombineCanvasUtil";
import {TransformContainer} from "./TransformContainer";
import {ICanvasManager} from "./ICanvasManager";

export class CanvasContainer{

	/**
	 * 親要素
	 */
	private manager:ICanvasManager;

	private elementList:HTMLCanvasElement[] = [];
	private contextList:CanvasRenderingContext2D[] = [];
	private transformList:TransformContainer[] = [];

	constructor(
		manager:ICanvasManager
	){
		this.manager = manager;
	}
	getSize():number{
		return this.elementList.length;
	}

	getCanvas(index:number):CanvasRenderingContext2D{
		return this.contextList.length > index ? this.contextList[index] : null;
	}

	getTransformContainer(index:number):TransformContainer{
		return this.transformList.length > index ? this.transformList[index] : null;
	}

	addCanvas():number{
		let element:HTMLCanvasElement = this.manager.createCanvas();
		this.manager.appendChild(element);

		this.elementList.push(element);
		this.contextList.push(element.getContext("2d"));
		this.transformList.push(new TransformContainer());
		return this.elementList.length - 1;
	}

	combineDataImage():string{
		return CombineCanvasUtil.combine(
			this.manager.getWidth(),
			this.manager.getHeight(),
			this.elementList[0],
			this.contextList
		);
	}

	get width():number{
		return this.manager.getWidth();
	}

	get height():number{
		return this.manager.getHeight();
	}

	removeCanvas(index:number):void{
		let element = this.elementList[index];
		try {
			this.manager.removeChild(element);
		} catch (e) {
			//	後始末中と重なる可能性があるので無視
		}
		this.contextList.splice(index,1);
		this.elementList.splice(index,1);
		this.transformList.splice(index,1);
	}

	sortCanvas(orders:number[]):void{

		//一旦全件削除
		for(let element of this.elementList){
			try {
				this.manager.removeChild(element);
				// this.getParent().removeChild(element);
			} catch (e) {
				//無視
				console.log(e);
			}
		}
		let elementList1:HTMLCanvasElement[] = [];
		let canvasList1:CanvasRenderingContext2D[] = [];
		let transformList1:TransformContainer[] = [];

		let i = 0 | 0;
		while(i < orders.length){
			let order = orders[i];
			if(order < 0 || order >= this.elementList.length || this.elementList[order] == null){
				i = (i + 1) | 0;
				continue;
			}
			try {
				this.manager.appendChild(this.elementList[order]);
				// this.getParent().appendChild(this.elementList[order]);

				elementList1.push(this.elementList[order]);
				canvasList1.push(this.contextList[order]);
				transformList1.push(this.transformList[order]);
			} catch (e) {
				console.log(e);
			}
			i = (i + 1) | 0;
		}
		this.elementList = elementList1;
		this.contextList = canvasList1;
		this.transformList = transformList1;
	}

	clear():void{
		this.elementList = [];
		this.contextList = [];
		this.transformList = [];
		this.manager.removeChildren();
	}
}
