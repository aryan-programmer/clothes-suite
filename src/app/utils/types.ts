import {IconName} from "@fortawesome/fontawesome-common-types";
import { FirebaseOptions } from "firebase/app";
import {OptionalString} from "../../lib/types";

export type Category = {
	id: number;
	title: string;
	icon: IconName;
};

/** @see {isProduct} ts-auto-guard:type-guard */
export type Product = {
	id: number;
	name: string;
	imageUrl: string;
	price: number;
};

/** @see {isProductList} ts-auto-guard:type-guard */
export type ProductList = {
	[key: string]: Product
};

/** @see {isProductsByCategory} ts-auto-guard:type-guard */
export type ProductsByCategory = {
	[type: string]: ProductList,
}

/** @see {isCartItem} ts-auto-guard:type-guard */
export type CartItem = Product & {
	quantity: number;
};

/** @see {isUserData} ts-auto-guard:type-guard */
export type UserData = {
	id: string;
	email: string;
	photoURL: OptionalString;
	phoneNumber: OptionalString;
	displayName: OptionalString;
	createdAt: Date;
};

/** @see {isFirebaseOptions} ts-auto-guard:type-guard */
export type FirebaseOptions_ = FirebaseOptions;

declare module 'react' {
	interface Attributes {
		children?: any;
	}
}
