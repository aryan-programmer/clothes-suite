import React, {useCallback, useRef, useState} from "react";

// export const getUseBinaryEvents = <KTrue extends keyof HTMLElementEventMap, KFalse extends keyof HTMLElementEventMap> (
// 	setsTrue: KTrue,
// 	setsFalse: KFalse,
// ) => function useBinaryEvents (): [React.RefCallback<HTMLElement>, boolean] {
// 	const [value, setValue] = useState(false);
//
// 	const handleSetsTrue = useCallback(() => setValue(true), []);
// 	const handleSetsFalse  = useCallback(() => setValue(false), []);
//
// 	const ref = useRef<HTMLElement | null>(null);
//
// 	const callbackRef = useCallback(
// 		(newRef: HTMLElement | null) => {
// 			const oldRef = ref.current;
// 			ref.current  = newRef;
// 			if (oldRef != null) {
// 				oldRef.removeEventListener(setsTrue, handleSetsTrue);
// 				oldRef.removeEventListener(setsFalse, handleSetsFalse);
// 			}
// 			if (newRef != null) {
// 				newRef.addEventListener(setsTrue, handleSetsTrue);
// 				newRef.addEventListener(setsFalse, handleSetsFalse);
// 			}
// 		},
// 		[handleSetsTrue, handleSetsFalse]
// 	);
//
// 	return [callbackRef, value];
// }

export function useHover (): [React.RefCallback<HTMLElement>, boolean] {
	const [value, setValue] = useState(false);

	const handleMouseOver = useCallback(() => setValue(true), []);
	const handleMouseOut  = useCallback(() => setValue(false), []);

	const ref = useRef<HTMLElement | null>(null);

	const callbackRef = useCallback(
		(newRef: HTMLElement | null) => {
			const oldRef = ref.current;
			ref.current  = newRef;
			if (oldRef != null) {
				oldRef.removeEventListener("mouseover", handleMouseOver);
				oldRef.removeEventListener("mouseout", handleMouseOut);
			}
			if (newRef != null) {
				newRef.addEventListener("mouseover", handleMouseOver);
				newRef.addEventListener("mouseout", handleMouseOut);
			}
		},
		[handleMouseOver, handleMouseOut]
	);

	return [callbackRef, value];
}

export function useActive (): [React.RefCallback<HTMLElement>, boolean] {
	const [value, setValue] = useState(false);

	const setTrue  = useCallback(() => setValue(true), []);
	const setFalse = useCallback(() => setValue(false), []);

	const ref = useRef<HTMLElement | null>(null);

	const callbackRef = useCallback(
		(newRef: HTMLElement | null) => {
			const oldRef = ref.current;
			ref.current  = newRef;
			if (oldRef != null) {
				oldRef.removeEventListener("mousedown", setTrue);
				oldRef.removeEventListener("mouseup", setFalse);
				oldRef.removeEventListener("mouseleave", setFalse);
			}
			if (newRef != null) {
				newRef.addEventListener("mousedown", setTrue);
				newRef.addEventListener("mouseup", setFalse);
				newRef.addEventListener("mouseleave", setFalse);
			}
		},
		[setTrue, setFalse]
	);

	return [callbackRef, value];
}

