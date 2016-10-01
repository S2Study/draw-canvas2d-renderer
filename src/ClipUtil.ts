import * as drawchat from "@s2study/draw-api";

import {TransformContainer} from "./TransformContainer";
import {PathUtil} from "./PathUtil";
export class ClipUtil {

	static setClip(
		context: CanvasRenderingContext2D,
		transform: TransformContainer,
		clip?: drawchat.structures.Clip): void {

		if (!clip) {
			return;
		}

		transform.setTransform(
			context,
			clip.transform
		);

		PathUtil.drawPathArray(context, clip.path);
		context.clip();
	}
}