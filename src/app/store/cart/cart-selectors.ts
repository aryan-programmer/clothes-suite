import {createSelector} from "@reduxjs/toolkit";
import {RootState} from "../root-reducer";
import {cartSlice} from "./cart-slice";

export const selectCart = (state: RootState) => state[cartSlice.name].cart;

export const selectNumCartItems = createSelector(
	[selectCart],
	(cart) => {
		let cartItems = 0;
		for (const item of cart) {
			cartItems += item.quantity;
		}
		return cartItems;
	}
);

export const selectTotalCartPrice = createSelector(
	[selectCart],
	(cart) => {
		let cartTotalCost = 0;
		for (const item of cart) {
			cartTotalCost += item.quantity * item.price;
		}
		return cartTotalCost;
	}
);

