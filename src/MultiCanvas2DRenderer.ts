import * as drawchat from "@s2study/draw-api";

import DrawchatRenderer = drawchat.renderer.DrawchatRenderer;
import PathItem = drawchat.structures.PathItem;
import MoveTo = drawchat.structures.MoveTo;
import ArcTo = drawchat.structures.ArcTo;
import QuadraticCurveTo = drawchat.structures.QuadraticCurveTo;
import LineTo = drawchat.structures.LineTo;
import BezierCurveTo = drawchat.structures.BezierCurveTo;
import Transform = drawchat.structures.Transform;
import GraphicsDraw = drawchat.structures.GraphicsDraw;
import Graphic = drawchat.structures.Graphic;
import Fill = drawchat.structures.Fill;
import LinerGradient = drawchat.structures.LinerGradient;
import RadialGradient = drawchat.structures.RadialGradient;
import Stroke = drawchat.structures.Stroke;
import TextDraw = drawchat.structures.TextDraw;
import Draw = drawchat.structures.Draw;
import Clip = drawchat.structures.Clip;

import {CanvasContainer} from "./CanvasContainer";
import {TransformContainer} from "./TransformContainer";
import {ClipUtil} from "./ClipUtil";
import {GraphicsUtil} from "./GraphicsUtil";
import {TextUtil} from "./TextUtil";
import {ICanvasManager} from "./ICanvasManager";
import {DrawAPIUtils} from "@s2study/draw-api/lib/DrawAPIUtils";

export class MultiCanvas2DRenderer implements DrawchatRenderer {

	private canvasContainer: CanvasContainer;

	constructor(manager: ICanvasManager) {
		this.canvasContainer = new CanvasContainer(
			manager
		);
	}

	get width(): number {
		return this.canvasContainer.width - this.canvasContainer.dx * 2;
	}

	get height(): number {
		return this.canvasContainer.height - this.canvasContainer.dy * 2;
	}

	size(): number {
		return this.canvasContainer.getSize();
	}

	sortLayer(orders: number[]): void {
		this.canvasContainer.sortCanvas(orders);
	}

	removeLayer(index: number): void {
		this.canvasContainer.removeCanvas(index);
	}

	addLayer(): number {
		return this.canvasContainer.addCanvas();
	}

	render(
		index: number,
		draws: Draw[],
		transform?: Transform,
		clip?: Clip): void {

		let context = this.canvasContainer.getCanvas(index);
		if (!context) {
			return;
		}
		let transformContainer = this.canvasContainer.getTransformContainer(index);
		if (transformContainer === null) {
			return;
		}
		transformContainer.setBaseTransform();
		transformContainer.setTransform(context);
		context.clearRect(0, 0, this.canvasContainer.width, this.canvasContainer.height);
		if (!draws || draws.length === 0) {
			return;
		}

		transformContainer.setBaseTransform(transform);
		transformContainer.resetNow();
		transformContainer.setTransform(context);

		// 切り抜きの設定
		ClipUtil.setClip(
			context,
			transformContainer,
			this.canvasContainer.dx,
			this.canvasContainer.dy,
			clip
		);
		this.renderDraw(
			context,
			draws,
			transformContainer,
			this.canvasContainer.dx,
			this.canvasContainer.dy
		);
	}

	renderDiff(
		index: number,
		draws: Draw[]): void {
		if (!draws || draws.length === 0) {
			return;
		}
		const context = this.canvasContainer.getCanvas(index);
		if (!context) {
			return;
		}
		const container = this.canvasContainer.getTransformContainer(index);
		if (container === null) {
			return;
		}
		this.renderDraw(
			context,
			draws,
			container,
			this.canvasContainer.dx,
			this.canvasContainer.dy
		);
	}

	refresh(): void {
		// 何もせず
	}

	clear(): void {
		this.canvasContainer.clear();
		// this.transformContainer = new TransformContainer();
	}

	createImageDataURI(): string {
		return DrawAPIUtils.complementString(this.canvasContainer.combineDataImage());
	}

	show(target?: number[]): void {
		for (let canvas of this.getCanvasList(target)) {
			canvas.globalAlpha = 1.0;
		}
	}

	hide(target?: number[]): void {
		for (let canvas of this.getCanvasList(target)) {
			canvas.globalAlpha = 0.0;
		}
	}

	getPixelColor(x: number, y: number, layerIndex: number): number[] {
		let canvas = this.canvasContainer.getCanvas(layerIndex);
		if (canvas === null) {
			return [];
		}
		let data: ImageData = canvas.getImageData(x, y, 1, 1);
		return [data.data[0], data.data[1], data.data[2], data.data[3]];
	}

	private renderDraw(
		context: CanvasRenderingContext2D,
		draws: Draw[],
		transformContainer: TransformContainer,
		dx: number,
		dy: number
	): void {
		let i = 0 | 0;
		while (i < draws.length) {
			let draw = draws[i];

			// パス描画
			if ((<GraphicsDraw>draw).graphics) {
				GraphicsUtil.renderGraphics(context, transformContainer, (<GraphicsDraw>draw), dx, dy);
				i = (i + 1) | 0;
				continue;
			}

			// テキスト描画
			TextUtil.renderTextDraw(context, transformContainer, <TextDraw>draw, dx, dy);
			i = (i + 1) | 0;
		}
	}

	private getCanvasList(targets?: number[]): CanvasRenderingContext2D[] {
		let result: CanvasRenderingContext2D[] = [];
		if (!targets) {
			return this.getCanvasAll();
		}
		for (let target of targets) {
			const canvas = this.canvasContainer.getCanvas(target);
			if (canvas === null) {
				continue;
			}
			result.push(canvas);
		}
		return result;
	}

	private getCanvasAll(): CanvasRenderingContext2D[] {
		let result: CanvasRenderingContext2D[] = [];
		let size = this.canvasContainer.getSize();
		let i = 0 | 0;
		while (i < size) {
			const canvas = this.canvasContainer.getCanvas(i);
			if (canvas === null) {
				continue;
			}
			result.push(canvas);
			i = (i + 1) | 0;
		}
		return result;
	}
}
