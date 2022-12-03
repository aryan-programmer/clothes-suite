import React, {ComponentType, createContext, useCallback, useMemo, useState} from "react";
import {withContext} from "../../lib/withContext";
import {CartItem, Product} from "../utils/types";

export type CartContextProps_T = {
	children: any,
}

export type CartContextData_T = {
	cartItems: number,
	cart: CartItem[];
	addItem (item: Product): void;
};

function addItemToCart (cartItems: CartItem[], item: Product): CartItem[] {
	const idx = cartItems.findIndex(value => value.id === item.id);
	if (idx === -1)
		return [...cartItems, {...item, quantity: 1}];
	else {
		const res = [...cartItems];
		res[idx]  = {...res[idx], quantity: res[idx].quantity + 1};
		return res;
	}
}

export const CartContext = createContext<CartContextData_T>({
	cartItems: 0,
	cart: [],
	addItem (item: CartItem) {
	}
});

export function CartContextProvider (props: CartContextProps_T) {
	const [cart, setCart] = useState<CartItem[]>([]);

	const cartItems = useMemo(() => {
		return cart.reduce((p, c) => p + c.quantity, 0);
	}, [cart]);

	const addItem = useCallback((item: CartItem) => setCart(addItemToCart(cart, item)), [cart]);

	const value: CartContextData_T = {cart, cartItems, addItem};
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
