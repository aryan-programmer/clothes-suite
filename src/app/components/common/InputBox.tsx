import _ from "lodash";
import React, {ChangeEventHandler, InputHTMLAttributes, useRef} from "react";

export type InputBoxPropsOrig_T = {
	className?: String,
	onChange?: ChangeEventHandler<HTMLInputElement>,
	value?: never,
	label?: string,
	placeholder?: string,
	id?: string,
	border?: string,
};

export type InputBoxProps_T =
	InputBoxPropsOrig_T
	& Omit<InputHTMLAttributes<HTMLInputElement>, keyof InputBoxPropsOrig_T>

function InputBox (props: InputBoxProps_T) {
	const {current: id} = useRef(props.id ?? _.uniqueId("InputBox-id-"));
	console.log("Rendered-" + id)

	let {className: newClasses, placeholder, onChange, value: ___, border, ...remainingProps} = props;

	let className = "form-control rounded-pill ";
	placeholder ??= " ";
	if (border != null) className += `border-${border} border-1 `;
	if (newClasses != null) className += newClasses;
	return (
		<div className="form-floating">
			<input
				id={id}
				className={className}
				placeholder={placeholder}
				onChange={onChange}
				{...remainingProps} />
			<label htmlFor={id}>{props.label}</label>
		</div>
	);
}

export default React.memo(InputBox);
