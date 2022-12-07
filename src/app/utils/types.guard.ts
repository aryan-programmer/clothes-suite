/*
 * Generated type guards for "types.ts".
 * WARNING: Do not manually change this file.
 */
import {isStringOrOptional} from "../../lib/types.guard";
import {CartItem, Product, ProductList, ProductsByCategory, UserData} from "./types";

export function isProduct (obj: unknown): obj is Product {
	const typedObj = obj as Product
	return (
		(typedObj !== null &&
			typeof typedObj === "object" ||
			typeof typedObj === "function") &&
		typeof typedObj["id"] === "number" &&
		typeof typedObj["name"] === "string" &&
		typeof typedObj["imageUrl"] === "string" &&
		typeof typedObj["price"] === "number"
	)
}

export function isProductList (obj: unknown): obj is ProductList {
	const typedObj = obj as ProductList
	return (
		(typedObj !== null &&
			typeof typedObj === "object" ||
			typeof typedObj === "function") &&
		Object.entries<any>(typedObj)
			.every(([key, value]) => (isProduct(value) as boolean &&
				typeof key === "string"))
	)
}

export function isProductsByCategory (obj: unknown): obj is ProductsByCategory {
	const typedObj = obj as ProductsByCategory
	return (
		(typedObj !== null &&
			typeof typedObj === "object" ||
			typeof typedObj === "function") &&
		Object.entries<any>(typedObj)
			.every(([key, value]) => (isProductList(value) as boolean &&
				typeof key === "string"))
	)
}

export function isCartItem (obj: unknown): obj is CartItem {
	const typedObj = obj as CartItem
	return (
		isProduct(typedObj) as boolean &&
		(typedObj !== null &&
			typeof typedObj === "object" ||
			typeof typedObj === "function") &&
		typeof typedObj["quantity"] === "number"
	)
}

export function isUserData (obj: unknown): obj is UserData {
	const typedObj = obj as UserData
	return (
		(typedObj !== null &&
			typeof typedObj === "object" ||
			typeof typedObj === "function") &&
		typeof typedObj["id"] === "string" &&
		typeof typedObj["email"] === "string" &&
		isStringOrOptional(typedObj["photoURL"]) as boolean &&
		isStringOrOptional(typedObj["phoneNumber"]) as boolean &&
		isStringOrOptional(typedObj["displayName"]) as boolean &&
		typedObj["createdAt"] instanceof Date
	)
}
