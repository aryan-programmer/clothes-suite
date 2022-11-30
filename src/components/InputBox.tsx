import _ from "lodash";
import React, {ChangeEventHandler, InputHTMLAttributes, useState} from "react";

export type InputBoxPropsOrig_T = {
	className?: String,
	onChange?: ChangeEventHandler<HTMLInputElement>,
	value?: string,
	label?: string,
	placeholder?: string,
	id?: string,
	border?: string,
};

export type InputBoxProps_T =
	InputBoxPropsOrig_T
	& Omit<InputHTMLAttributes<HTMLInputElement>, keyof InputBoxPropsOrig_T>

export default function InputBox (props: InputBoxProps_T) {
	const [id] = useState(props.id ?? _.uniqueId("InputBox-id-"));

	let {className: newClasses, placeholder, onChange, value, border, ...remainingProps} = props;

	let className = "form-control rounded-pill ";
	placeholder ??= " ";
	value ??= "";
	if (border != null) className += `border-${border} border-1 `;
	if (newClasses != null) className += newClasses;
	return (
		<div className="form-floating">
			<input
				id={id}
				className={className}
				placeholder={placeholder}
				onChange={onChange}
				value={value}
				{...remainingProps} />
			<label htmlFor={id}>{props.label}</label>
		</div>
	);
}
