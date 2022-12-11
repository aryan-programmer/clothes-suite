import update from "immutability-helper";
import React, {ComponentType, createContext, useMemo, useReducer, useState} from "react";
import {InvalidArgumentException} from "../../lib/InvalidArgumentException";
import {withContext} from "../../lib/withContext";
import {inc} from "../utils/consts";
import {CartItem, Product} from "../utils/types";

export type CartContextProps_T = {
	children: any,
}

export namespace CartActions {
	export type State_T = {
		numItems: number,
		totalCost: number,
		cart: CartItem[];
	}

	const ADD_ITEM = "ADD_ITEM";
	export type AddItemAction_T = {
		type: typeof ADD_ITEM,
		item: Product
	};

	export function AddItem (item: Product): AddItemAction_T {
		return {type: ADD_ITEM, item}
	}

	const SET_ITEM_QUANTITY = "SET_ITEM_QUANTITY";
	export type SetItemQuantityAction_T = {
		type: typeof SET_ITEM_QUANTITY,
		index: number,
		quantity: number
	};

	export function SetItemQuantity (index: number, quantity: number): SetItemQuantityAction_T {
		return {type: SET_ITEM_QUANTITY, index, quantity};
	}

	const REMOVE_ITEM = "REMOVE_ITEM";
	export type RemoveItemAction_T = {
		type: typeof REMOVE_ITEM,
		index: number,
	};

	export function RemoveItem (index: number): RemoveItemAction_T {
		return {type: REMOVE_ITEM, index,};
	}

	export type Action_T = AddItemAction_T | SetItemQuantityAction_T | RemoveItemAction_T;
	export type Dispatch_T = React.Dispatch<Action_T>;

	export const defaultState: State_T = {
		numItems: 0,
		totalCost: 0,
		cart: [],
	};

	function reducer (state: State_T, action: Action_T): State_T {
		if (action.type === ADD_ITEM) {
			const {item} = action;
			const idx    = state.cart.findIndex(value => value.id === item.id);
			if (idx === -1)
				return update(state, {cart: {$push: [{...item, quantity: 1}]}});
			else
				return update(state, {cart: {[idx]: {quantity: inc}}});
		} else if (action.type === SET_ITEM_QUANTITY) {
			const {quantity, index} = action;
			if (quantity <= 0)
				return update(state, {cart: {$splice: [[index, 1]]}});
			else
				return update(state, {cart: {[index]: {quantity: {$set: quantity}}}});
		} else if (action.type === REMOVE_ITEM) {
			const {index} = action;
			return update(state, {cart: {$splice: [[index, 1]]}});
		}
		throw new InvalidArgumentException("Invalid action passed to UserReducer.reducer");
	}

	export function reducerWithEffects (state: State_T, action: Action_T) {
		const res         = reducer(state, action);
		let cartItems     = 0;
		let cartTotalCost = 0;
		for (const item of res.cart) {
			cartItems += item.quantity;
			cartTotalCost += item.quantity * item.price;
		}
		res.numItems  = cartItems;
		res.totalCost = cartTotalCost;
		return res;
	}
}

export type CartContextData_T = {
	state: CartActions.State_T
	dispatch: CartActions.Dispatch_T,
};

export const CartContext = createContext<CartContextData_T>(null as unknown as CartContextData_T);

export function CartContextProvider (props: CartContextProps_T) {
	const [state, dispatch] = useReducer(CartActions.reducerWithEffects, CartActions.defaultState);

	const value: CartContextData_T = {state, dispatch};
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
