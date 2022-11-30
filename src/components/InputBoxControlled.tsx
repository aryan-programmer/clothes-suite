import _ from "lodash";
import React, {ChangeEventHandler, InputHTMLAttributes, useState} from "react";

export type InputBoxControlledPropsOrig_T = {
	className?: String,
	onChange?: ChangeEventHandler<HTMLInputElement>,
	value?: string,
	label?: string,
	placeholder?: string,
	id?: string,
	border?: string,
};

export type InputBoxControlledProps_T =
	InputBoxControlledPropsOrig_T
	& Omit<InputHTMLAttributes<HTMLInputElement>, keyof InputBoxControlledPropsOrig_T>

export default function InputBoxControlled (props: InputBoxControlledProps_T) {
	const [id] = useState(props.id ?? _.uniqueId("InputBoxControlled-id-"));

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
