import React, {ComponentType, createContext, useCallback, useState} from "react";
import {withContext} from "../../lib/withContext";
import {CartItem} from "../utils/types";

export type CartContextProps_T = {
	children: any,
}

export type CartContextData_T = {
	cart: CartItem[];
	addItem (item: CartItem): void;
};

function addItemToCart (cartItems: CartItem[], item: CartItem): CartItem[] {
	return cartItems;
}

export const CartContext = createContext<CartContextData_T>({
	cart: [],
	addItem (item: CartItem) {
	}
});

export function CartContextProvider (props: CartContextProps_T) {
	const [cart, setCart] = useState<CartItem[]>([]);

	const addItem = useCallback((item: CartItem) => setCart(cart => addItemToCart(cart, item)), []);

	const value: CartContextData_T = {cart: cart, addItem};
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
