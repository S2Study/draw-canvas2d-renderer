import {ICanvasManager} from "./ICanvasManager";
export class DOMCanvasManager implements ICanvasManager{

	private width:number;
	private height:number;
	private id:string;
	private parent:Element;

	constructor(
		parent:Element|string,
		width?:number,
		height?:number
	){
		if(typeof parent === 'string'){
			this.id = <string>parent;
			this.width = width;
			this.height = height;
			return;
		}
		this.parent = <Element>parent;
		this.width = width ? width : this.parent.clientWidth;
		this.height = height ? height : this.parent.clientHeight;
	}

	createCanvas():HTMLCanvasElement{
		let element =  this.getParent().ownerDocument.createElement("canvas");
		element.width = this.width;
		element.height = this.height;
		element.style.position = "absolute";
		return element;
	}

	appendChild(canvas:HTMLCanvasElement):void{
		this.getParent().appendChild(canvas);
	}

	removeChild(canvas:HTMLCanvasElement):void{
		this.getParent().removeChild(canvas);
	}

	getWidth():number{
		return this.width;
	}

	getHeight():number{
		return this.height;
	}

	removeChildren():void{
		if(this.id !== null){
			this.parent = null;
		}
		let element = this.getParent();
		if(element == null){
			return;
		}
		while (element.firstChild) element.removeChild(element.firstChild);
	}

	private getParent():Element{
		if(this.parent != null){
			return this.parent;
		}
		this.parent =  document.getElementById(this.id);
		this.width = this.width ? this.width : this.parent.clientWidth;
		this.height = this.height ? this.height : this.parent.clientHeight;
		return this.parent;
	}
}