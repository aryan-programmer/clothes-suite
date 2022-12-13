import {css} from "styled-components";
import {hexToRgb, rgbToHsl} from "../../lib/functions/colors";
import nn from "../../lib/functions/nn";
import vars from "../../style/export-vars.module.scss";

export const spacer     = +vars["spacer-1"];
export const spacerUnit = vars["spacer-1-unit"];

export const breakpoints: Record<string, string | number> = JSON.parse(vars["breakpoints"].slice(1, -1));

export const smallestSizeSideNav = vars["smallest-size-side-nav"];
export const btnTransition       = vars["btn-transition"];
export const thumbnailSize       = "145px";// vars["thumbnail-size"];
export const thumbnailSizeSm     = "25vw";//vars["thumbnail-size-sm"];

export const borderRadiusValues = JSON.parse(vars["border-radius-values"].slice(1, -1));

export const sideNavBreakpointMinWidth = breakpoints[smallestSizeSideNav];

export function breakpointMax (v: string) {
	return (parseInt(breakpoints[v].toString()) - 0.02) + "px";
}

export function shadowsFromColor (hex: string, isDark: boolean = false) {
	const {r, g, b} = nn(hexToRgb(hex));
	let hsl         = rgbToHsl(r, g, b);
	const hue       = hsl[0] * 360;
	return isDark ? css`
			--light-bg-dark-shadow: hsla(${hue}, 60%, ${(20 + hsl[2] * 100) / 2}%);
			--light-bg-light-shadow: hsla(${hue}, 70%, 83%);
	` : css`
			--light-bg-dark-shadow: hsla(${hue}, 60%, 65%);
			--light-bg-light-shadow: hsla(${hue}, 70%, 93%);
	`;
}

export {vars};
