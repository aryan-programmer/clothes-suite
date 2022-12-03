import _ from "lodash";
import vars from "../../style/export-vars.module.scss";

export const spacer                                  = +vars["spacer-1"];
export const spacerUnit                              = vars["spacer-1-unit"];
let breakpointsOrig: Record<string, string | number> = JSON.parse(vars["breakpoints"].slice(1, -1));
export const breakpoints: Record<string, number>     = _.mapValues(breakpointsOrig,
	(value, key) => typeof value == "number" ? value : parseInt(value));
export const smallestSizeSideNav                     = "sm";// vars["smallest-size-side-nav"];
console.log(breakpoints, smallestSizeSideNav);

export {vars};
