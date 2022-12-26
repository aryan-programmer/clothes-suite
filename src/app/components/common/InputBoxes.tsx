import _ from "lodash";
import {observer} from "mobx-react";
import React, {ChangeEventHandler, InputHTMLAttributes, useRef} from "react";

type InputBoxCommon_OwnProps_T = {
	className?: String,
	onChange?: ChangeEventHandler<HTMLInputElement>,
	placeholder?: string,
	id?: string,
	border?: string,
};

type InputBoxCommon_Props_T<T> = T & Omit<InputHTMLAttributes<HTMLInputElement>, keyof T>

export type InputBox_Props_T = InputBoxCommon_Props_T<InputBoxCommon_OwnProps_T & {
	value?: never,
	label?: string,
}>;

export type InputBoxControlled_Props_T = InputBoxCommon_Props_T<InputBoxCommon_OwnProps_T & {
	value?: string | ReadonlyArray<string> | number | undefined;
	label?: string,
}>;

export type InputBoxUnlabeled_Props_T = InputBoxCommon_Props_T<InputBoxCommon_OwnProps_T & {
	value?: never;
}>;

export type InputBoxControlledUnlabeled_Props_T = InputBoxCommon_Props_T<InputBoxCommon_OwnProps_T & {
	value?: string | ReadonlyArray<string> | number | undefined;
}>;

function InputBoxUnlabeled_ (props: InputBoxUnlabeled_Props_T) {
	let {className: newClasses, placeholder, onChange, value: ___, border, ...remainingProps} = props;

	let className = "form-control rounded-pill ";
	placeholder ??= " ";
	if (border != null) className += `border-${border} border-1 `;
	if (newClasses != null) className += newClasses;
	return (
		<input
			className={className}
			placeholder={placeholder}
			onChange={onChange}
			{...remainingProps} />
	);
}

export const InputBoxUnlabeled = observer(InputBoxUnlabeled_);

function InputBox_ (props: InputBox_Props_T) {
	const {current: id} = useRef(props.id ?? _.uniqueId("InputBox-id-"));

	let {value: __, label, id: ___, ...remainingProps} = props;
	return (
		<div className="form-floating">
			<InputBoxUnlabeled
				id={id}
				{...remainingProps} />
			<label htmlFor={id}>{label}</label>
		</div>
	);
}

export const InputBox = observer(InputBox_);

export const InputBoxControlledUnlabeled = observer(function InputBoxControlledUnlabeled (props: InputBoxControlledUnlabeled_Props_T) {
	let {className: newClasses, placeholder, onChange, value, border, ...remainingProps} = props;

	let className = "form-control rounded-pill ";
	placeholder ??= " ";
	value ??= "";
	if (border != null) className += `border-${border} border-1 `;
	if (newClasses != null) className += newClasses;
	return (
		<input
			className={className}
			placeholder={placeholder}
			onChange={onChange}
			value={value}
			{...remainingProps} />
	);
});

export const InputBoxControlled = observer(function InputBoxControlled (props: InputBoxControlled_Props_T) {
	const {current: id} = useRef(props.id ?? _.uniqueId("InputBoxControlled-id-"));

	let {label, id: ___, ...remainingProps} = props;

	return (
		<div className="form-floating">
			<InputBoxControlledUnlabeled
				id={id}
				{...remainingProps} />
			<label htmlFor={id}>{label}</label>
		</div>
	);
});
