import React, {ButtonHTMLAttributes} from "react";

export type BtnPropsOrig_T = {
	className?: String,
	extension?: string,
	borderColor?: string,
	children?: any,
	type?: "button" | "submit" | "reset",
};

export type BtnProps_T =
	BtnPropsOrig_T
	& Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof BtnPropsOrig_T>

export default function Btn (props: BtnProps_T) {
	let {className: newClasses, children, extension, borderColor, type, ...others} = props;
	let className                                                                  = "btn rounded-pill text-uppercase ";
	if (extension != null) className += `btn-${extension} `;
	if (borderColor != null) className += `btn-bordered-${borderColor} `;
	if (newClasses != null) className += newClasses;
	type ??= "button";
	return (
		<button
			className={className}
			type={type}
			{...others}>
			{children}
		</button>
	);
}
