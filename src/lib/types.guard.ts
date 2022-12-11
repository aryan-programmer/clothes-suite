/*
 * Generated type guards for "types.ts".
 * WARNING: Do not manually change this file.
 */
import {OptionalString} from "./types";

export function isStringOrOptional (obj: unknown): obj is OptionalString {
	const typedObj = obj as OptionalString
	return (
		(typeof typedObj === "undefined" ||
			typedObj === null ||
			typeof typedObj === "string")
	)
}
