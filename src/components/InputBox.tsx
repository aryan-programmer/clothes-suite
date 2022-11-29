import _ from "lodash";
import React, {ChangeEventHandler, InputHTMLAttributes, useState} from "react";

export type InputBoxPropsOrig_T = {
	className?: String,
	onChange?: ChangeEventHandler<HTMLInputElement>,
	value?: string,
	label?: string,
	placeholder?: string,
	id?: string,
};

export type InputBoxProps_T =
	InputBoxPropsOrig_T
	& Omit<InputHTMLAttributes<HTMLInputElement>, keyof InputBoxPropsOrig_T>

export default function InputBox (props: InputBoxProps_T) {
	const [id] = useState(props.id ?? _.uniqueId("InputBox-id-"));

	let {className, placeholder, onChange, value, ...remainingProps} = props;
	className ??= "";
	placeholder ??= " ";
	value ??= "";
	return (
		<div className="form-floating">
			<input
				id={id}
				className={`form-control rounded-pill ${className}`}
				placeholder={placeholder}
				onChange={onChange}
				value={value}
				{...remainingProps} />
			<label htmlFor={id}>{props.label}</label>
		</div>
	);
}
