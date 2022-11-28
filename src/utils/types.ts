import {IconName} from "@fortawesome/fontawesome-common-types";

export type Optional<T> = T | null | undefined;
export type Null<T> = T | null;
export type Undefined<T> = T | undefined;
export type Object = { [key: string | symbol | number]: Object | any };
export type PromiseOrT<T> = Promise<T> | T;

export type Category = {
	id: number;
	title: string;
	icon: IconName;
};

export type UserData = {
	id: string;
	email: string;
	photoURL: Optional<string>;
	phoneNumber: Optional<string>;
	displayName: Optional<string>;
	createdAt: Date;
};
