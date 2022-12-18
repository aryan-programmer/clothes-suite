// From https://webgradients.com/
import {Appearance} from "@stripe/stripe-js";
// 163 Fresh Oasis
import styled from "styled-components";
import {
	borderRadiusValues,
	boxShadowGen,
	boxShadowInsetGen,
	fontFamilySansSerif,
	shadowsFromColorCss,
	shadowsFromColorObject,
	themeColors
} from "../../utils/css";
import {spacing} from "../../utils/spacing";
import {FormCard} from "../common/FormCard";

export const gradient = {
	averageColor: "#9ecdf1",
	gradient: "linear-gradient(315deg, #7DE2FC 0%, #B9B6E5 100%)",
};

export const PaymentFormCard = styled(FormCard)`
	${shadowsFromColorCss(gradient.averageColor)}
	background: ${gradient.gradient};
`;

let tabBackgroundColor                    = themeColors["light"];
let tabSelectedBackgroundColor            = themeColors["light-info"];
let backgroundColor                       = gradient.averageColor;//themeColors["light"];
let inputShadowColor                      = "#6a71f4";//themeColors["primary"];
let inputBorder                           = "none";//`1px solid ${themeColors["warning"]}`;
export const stripeAppearance: Appearance = {
	labels: "floating",
	theme: 'flat',
	variables: {
		fontWeightNormal: '500',
		borderRadius: '2px',
		colorBackground: 'white',
		colorPrimary: themeColors["primary"],
		colorDanger: themeColors["danger"],
		colorSuccess: themeColors["success"],
		colorWarning: themeColors["warning"],
		colorPrimaryText: 'white',
		spacingGridRow: '15px',
		spacingUnit: spacing(1),
		fontFamily: fontFamilySansSerif
	},
	rules: {
		'.Tab, .Block': {
			boxShadow: boxShadowGen(1, shadowsFromColorObject(tabBackgroundColor)),
			borderRadius: borderRadiusValues["lg"],
			backgroundColor: tabBackgroundColor
		},
		'.Tab:hover': {
			boxShadow: boxShadowGen(0.5, shadowsFromColorObject(backgroundColor)),
		},
		'.Tab--selected': {
			boxShadow: boxShadowInsetGen(1, shadowsFromColorObject(tabSelectedBackgroundColor)),
			backgroundColor: tabSelectedBackgroundColor
		},
		'.Input': {
			boxShadow: boxShadowInsetGen(1, shadowsFromColorObject(inputShadowColor)),
			borderRadius: borderRadiusValues["pill"],
			padding: `${spacing(2)} ${spacing(3)}`,
			backgroundColor: "transparent",
			border: inputBorder,
		},
		'.Input:focus': {
			boxShadow: boxShadowInsetGen(0.5, shadowsFromColorObject(inputShadowColor)),
		},
		'.SwitchControl': {
			boxShadow: boxShadowInsetGen(1, shadowsFromColorObject(backgroundColor)),
		},
		'.CheckboxInput, .CheckboxInput:focus': {
			borderRadius: borderRadiusValues["md"],
			boxShadow: boxShadowGen(0.5, shadowsFromColorObject(backgroundColor)),
		},
		'.CheckboxInput--checked, .CheckboxInput--checked:focus': {
			boxShadow: boxShadowInsetGen(0.5, shadowsFromColorObject(backgroundColor)),
		}
	},
};
