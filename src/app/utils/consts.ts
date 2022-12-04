import {FastAverageColor} from "fast-average-color";

export const APPLICATION_NAME = "Clothes Suite";
export const fac              = new FastAverageColor();

export function clamp99 (v: number) {
	return v > 99 ? "99+" : v;
}

export function inc (v: number) {
	return v + 1;
}
