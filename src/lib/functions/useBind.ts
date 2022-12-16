import {ChangeEvent, Dispatch, SetStateAction, useCallback, useState} from "react";

export type Bind_T<V, Ev> = {
	value: V,
	onChange: (event: Ev) => void
};

export type BindOneWayToState_T<Ev> = {
	onChange: (event: Ev) => void
};

export function getInputEventValue (event: ChangeEvent<HTMLInputElement>) {
	return event.target.value;
}

export function useBind<S, Ev> (initialState: S | (() => S), eventToValueTransformer: (ev: Ev) => S): [
	S,
	Dispatch<SetStateAction<S>>,
	Bind_T<S, Ev>,
	BindOneWayToState_T<Ev>
] {
	const [v, setV]           = useState(initialState);
	let onChange              = useCallback((event: Ev) => {
		setV(eventToValueTransformer(event))
	}, [eventToValueTransformer]);
	const bind: Bind_T<S, Ev> = {
		value: v,
		onChange
	};
	return [v, setV, bind, {onChange}];
}

export function useBindString (initialState: string | (() => string)): [
	string,
	Dispatch<SetStateAction<string>>,
	Bind_T<string, ChangeEvent<HTMLInputElement>>,
	BindOneWayToState_T<ChangeEvent<HTMLInputElement>>
] {
	const [v, setV]                                           = useState(initialState);
	let onChange                                              = useCallback((event: ChangeEvent<HTMLInputElement>) => {
		setV(event.target.value)
	}, []);
	const bind: Bind_T<string, ChangeEvent<HTMLInputElement>> = {
		value: v,
		onChange
	};
	return [v, setV, bind, {onChange}];
}

