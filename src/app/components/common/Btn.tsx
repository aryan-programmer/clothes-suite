import {observer} from "mobx-react";
import React from "react";

export type BtnPropsOrig_T = {
	className?: String,
	extension?: string,
	borderColor?: string,
	children?: any,
	rounded?: string,
};
export type BtnProps_T<As extends React.ElementType = "button"> =
	BtnPropsOrig_T
	& { as?: As }
	& Omit<React.ComponentProps<As>, keyof BtnPropsOrig_T>

function Btn<As extends React.ElementType = "button"> (props: BtnProps_T<As>) {
	let {className: newClasses, children, extension, borderColor, as, rounded, ...others} = props;

	const AsElem = as ?? "button";

	let className = `btn text-uppercase rounded-${rounded ?? "pill"} `;
	if (extension != null) className += `btn-${extension} `;
	if (borderColor != null) className += `btn-bordered-${borderColor} `;
	if (newClasses != null) className += newClasses;
	if (AsElem === "button") {
		// @ts-ignore
		others.type ??= "button";
	}
	return (
		<AsElem
			className={className}
			{...others}>
			{children}
		</AsElem>
	);
}

export default observer(Btn);
