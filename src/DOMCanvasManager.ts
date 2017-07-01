import {ICanvasManager} from "./ICanvasManager";
import {DrawAPIUtils} from "@s2study/draw-api/lib/DrawAPIUtils";

export class DOMCanvasManager implements ICanvasManager {

	private width: number | undefined | null;
	private height: number | undefined | null;
	private dx: number;
	private dy: number;
	private id: string;
	private parent: Element | null;

	constructor(
		parent: Element | string,
		width?: number | null,
		height?: number | null,
		dx?: number | null,
		dy?: number | null,
	) {

		this.dx = DrawAPIUtils.complementNumber(dx, 0);
		this.dy = DrawAPIUtils.complementNumber(dy, 0);

		if (typeof parent === "string") {
			this.id = <string>parent;
			this.width = width;
			this.height = height;
			this.parent = null;
			return;
		}

		this.parent = <Element>parent;
		this.width = DrawAPIUtils.complementNumber(width, this.parent.clientWidth);
		this.height = DrawAPIUtils.complementNumber(height, this.parent.clientHeight);
	}

	createCanvas(): HTMLCanvasElement {
		let element = this.getParent().ownerDocument.createElement("canvas");
		element.width = this.width!;
		element.height = this.height!;
		element.style.position = "absolute";
		return element;
	}

	appendChild(canvas: HTMLCanvasElement): void {
		this.getParent().appendChild(canvas);
	}

	removeChild(canvas: HTMLCanvasElement): void {
		this.getParent().removeChild(canvas);
	}

	getWidth(): number {
		return DrawAPIUtils.complementNumber(this.width);
	}

	getHeight(): number {
		return DrawAPIUtils.complementNumber(this.height);
	}

	getStartX(): number {
		return this.dx;
	}

	getStartY(): number {
		return this.dy;
	}

	removeChildren(): void {
		if (this.id !== null) {
			this.parent = null;
		}
		let element = this.getParent();
		if (element == null) {
			return;
		}
		while (element.firstChild) element.removeChild(element.firstChild);
	}

	private getParent(): Element {

		if (this.parent != null) {
			return this.parent;
		}
		this.parent = document.getElementById(this.id)!;

		this.width = DrawAPIUtils.complementNumber(this.width, this.parent.clientWidth);
		this.height = DrawAPIUtils.complementNumber(this.height, this.parent.clientHeight);
		return this.parent;
	}
}