export type Optional<T> = T | null | undefined;
/** @see {isStringOrOptional} ts-auto-guard:type-guard */
export type OptionalString = Optional<string>;
export type Null<T> = T | null;
export type Undefined<T> = T | undefined;
export type Object = { [key: string | symbol | number]: Object | any };
export type PromiseOrT<T> = Promise<T> | T;
export type PromiseLikeOrT<T> = PromiseLike<T> | T;
export type NotNull<T> = T extends infer R | null | undefined ? R : never;

export function assertTypeOf<T> (v: any, fn: (v: any) => v is T, errorMessage: OptionalString = null): asserts v is T {
	if (!fn(v)) {
		if (errorMessage != null) {
			console.error("assertTypeOf: ", errorMessage, ": Value ", v, " doesn't conform to type guard ", fn);
			throw new TypeError(`${errorMessage}: Value doesn't conform to type guard ${fn.name}`);
		} else {
			console.error("assertTypeOf: Value ", v, " doesn't conform to type guard ", fn);
			throw new TypeError(`Value doesn't conform to type guard ${fn.name}`);
		}
	}
}
