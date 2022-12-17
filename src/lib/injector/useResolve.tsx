import {container, InjectionToken} from "tsyringe";

export function useResolve<T = object> (type: InjectionToken<T>): T {
	return container.resolve(type);
}
