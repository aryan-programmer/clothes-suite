import vars from "../style/export-vars.module.scss";

export const spacer     = +vars["spacer-1"];
export const spacerUnit = vars["spacer-1-unit"];
const max               = 25;
const cache             = Array.from({length: max}, (x, i) => spacingNoCache(i));

export function spacingNoCache (v: number): string {
	return spacer * v + spacerUnit;
}

export function spacing (v: number): string {
	if (v > 0 && v < max) return cache[v];
	return spacer * v + spacerUnit;
}
