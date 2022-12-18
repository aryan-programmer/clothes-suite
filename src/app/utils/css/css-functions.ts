import {css} from "styled-components";
import {hexToRgb, hslToRgb, rgbToHex, rgbToHsl} from "../../../lib/functions/colors";
import nn from "../../../lib/functions/nn";
import {breakpoints} from "./css-vars";

export function breakpointMax (v: string) {
	return (parseInt(breakpoints[v].toString()) - 0.02) + "px";
}

export type CssShadows_T = { lightBgLightShadow: string; lightBgDarkShadow: string };

export function boxShadowGen (m: number, shadows: CssShadows_T) {
	const {lightBgLightShadow, lightBgDarkShadow} = shadows;
	const v                                       = 3 * m;
	const w                                       = 6 * m;
	return `${v}px ${v}px ${w}px ${lightBgDarkShadow}, -${v}px -${v}px ${w}px ${lightBgLightShadow}`;
}

export function boxShadowInsetGen (m: number, shadows: CssShadows_T) {
	const {lightBgLightShadow, lightBgDarkShadow} = shadows;
	const v                                       = 3 * m;
	const w                                       = 6 * m;
	return `inset ${v}px ${v}px ${w}px ${lightBgDarkShadow}, inset -${v}px -${v}px ${w}px ${lightBgLightShadow}`;
}

export function shadowsFromColorObject (hex: string, isDark: boolean = false): CssShadows_T {
	const {r, g, b} = nn(hexToRgb(hex));
	let hsl         = rgbToHsl(r, g, b);
	const hue       = hsl[0];
	return isDark ? {
		lightBgDarkShadow: rgbToHex(...hslToRgb(hsl[0], 60, (20 + hsl[2] * 100) / 2)),
		lightBgLightShadow: rgbToHex(...hslToRgb(hue, 70, 83)),
	} : {
		lightBgDarkShadow: rgbToHex(...hslToRgb(hue, 60, 65)),
		lightBgLightShadow: rgbToHex(...hslToRgb(hue, 70, 93)),
	};
}

export function shadowsFromColorCss (hex: string, isDark: boolean = false) {
	const {lightBgLightShadow, lightBgDarkShadow} = shadowsFromColorObject(hex, isDark);
	return css`
			--light-bg-dark-shadow: ${lightBgDarkShadow};
			--light-bg-light-shadow: ${lightBgLightShadow};
	`;
}
