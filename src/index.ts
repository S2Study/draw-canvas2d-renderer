import * as drawchat from "@s2study/draw-api";
import DrawchatRenderer = drawchat.renderer.DrawchatRenderer;

import {MultiCanvas2DRenderer} from "./MultiCanvas2DRenderer";
import {ICanvasManager} from "./ICanvasManager";
import {DOMCanvasManager} from "./DOMCanvasManager";

export function createRenderer(manager: ICanvasManager): DrawchatRenderer {
	return new MultiCanvas2DRenderer(manager);
}

/**
 * 指定された要素配下にRendererコンポーネントを配置する。
 * @param parent この要素から見て0,0を左上として描画する。直下要素は空である必要がある。
 *        styleのposition 属性はrelativeにしておく。
 * @param width 要素の幅。指定されていない場合はrendererのデフォルト値が指定される。
 * @param height 要素の高さ。指定されていない場合はrendererのデフォルト値が指定される。
 * @param startX X座標原点の指定
 * @param startY Y座標原点の指定
 */
export function createDOMRenderer(
	parent: Element|string,
	width?: number | null,
	height?: number | null,
	startX?: number | null,
	startY?: number | null
): DrawchatRenderer {
	return createRenderer(new DOMCanvasManager(parent, width, height, startX, startY));
}