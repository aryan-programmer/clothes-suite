import vars from "../../../style/export-vars.module.scss";

export const spacer     = +vars["spacer-1"];
export const spacerUnit = vars["spacer-1-unit"];

export const breakpoints: Record<string, string | number> = JSON.parse(vars["breakpoints"].slice(1, -1));

export const smallestSizeSideNav = vars["smallest-size-side-nav"];
export const btnTransition       = vars["btn-transition"];
export const thumbnailSize       = "145px";
export const thumbnailSizeSm     = "25vw";

export const borderRadiusValues = JSON.parse(vars["border-radius-values"].slice(1, -1));
export const themeColors        = JSON.parse(vars["theme-colors"].slice(1, -1));

export const sideNavBreakpointMinWidth = breakpoints[smallestSizeSideNav];

export const fontFamilySansSerif = vars["font-family-sans-serif"];
export const fontSizeBase        = vars["font-size-base"];
export const fontUrl             = vars["font-url"].slice(1, -1);
export const fontUrlShort        = vars["font-url-short"].slice(1, -1);

export {vars};
