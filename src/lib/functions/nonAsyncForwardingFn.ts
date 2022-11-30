export function nonAsyncForwardingFn<TRes, TArgs extends any[]> (fn: (...args: TArgs) => PromiseLike<TRes>) {
	return (...args: TArgs) => {
		fn(...args)
	};
}
