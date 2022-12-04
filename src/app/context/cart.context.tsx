import update from "immutability-helper";
import React, {ComponentType, createContext, useCallback, useMemo, useState} from "react";
import {withContext} from "../../lib/withContext";
import {inc} from "../utils/consts";
import {CartItem, Product} from "../utils/types";

export type CartContextProps_T = {
	children: any,
}

class Functions {
	static addItem (cartItems: CartItem[], item: Product): CartItem[] {
		const idx = cartItems.findIndex(value => value.id === item.id);
		if (idx === -1)
			return [...cartItems, {...item, quantity: 1}];
		else {
			const res = [...cartItems];
			res[idx]  = {...res[idx], quantity: res[idx].quantity + 1};
			return update(cartItems, {[idx]: {quantity: inc}});
		}
	}

	static setItemQuantity (cartItems: CartItem[], index: number, quantity: number) {
		if (quantity <= 0) return Functions.removeItem(cartItems, index);
		return update(cartItems, {[index]: {quantity: {$set: quantity}}});
	}

	static removeItem (cartItems: CartItem[], index: number) {
		return update(cartItems, {$splice: [[index, 1]]});
	}
}

export type CartContextData_T = {
	numItems: number,
	totalCost: number,
	cart: CartItem[];
	addItem (item: Product): void;
	setItemQuantity (index: number, quantity: number): void;
	removeItem (index: number): void;
};

export const CartContext = createContext<CartContextData_T>(null as unknown as CartContextData_T);

export function CartContextProvider (props: CartContextProps_T) {
	const [cart, setCart] = useState<CartItem[]>([]);

	const [numItems, totalCost] = useMemo(() => {
		let cartItems     = 0;
		let cartTotalCost = 0;
		for (const item of cart) {
			cartItems += item.quantity;
			cartTotalCost += item.quantity * item.price;
		}
		return [cartItems, cartTotalCost];
	}, [cart]);

	const addItem         = useCallback(
		(item: CartItem) =>
			setCart(Functions.addItem(cart, item)),
		[cart]);
	const setItemQuantity = useCallback(
		(index: number, quantity: number) =>
			setCart(Functions.setItemQuantity(cart, index, quantity)),
		[cart]);
	const removeItem      = useCallback(
		(index: number) =>
			setCart(Functions.removeItem(cart, index)),
		[cart]);

	const value: CartContextData_T = {cart, numItems, totalCost, addItem, setItemQuantity, removeItem};
	return (<CartContext.Provider value={value}>
		{props.children}
	</CartContext.Provider>)
}

export type HasCartContext_Props_T = {
	CartContext: CartContextData_T,
}

export function withCartContext<TProps extends Record<string, any>> (WrappedComponent: ComponentType<TProps>) {
	return withContext(WrappedComponent, "CartContext", CartContext);
}
