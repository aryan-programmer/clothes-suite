import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {CartItem, Product} from "../../utils/types";

export const CART_STATE_NAME = "cartState";

export type CartState_T = {
	cart: CartItem[];
}

const initialState: CartState_T = {
	cart: [],
};

export const cartSlice = createSlice({
	name: CART_STATE_NAME,
	initialState,
	reducers: {
		addItem: function (state, action: PayloadAction<Product>) {
			const item = action.payload;
			const idx  = state.cart.findIndex(value => value.id === item.id);
			if (idx === -1) {
				state.cart.push({...item, quantity: 1});
			} else {
				state.cart[idx].quantity++;
			}
		},
		setItemQuantity (state, action: PayloadAction<{ index: number, quantity: number }>) {
			const {index, quantity} = action.payload;
			if (quantity <= 0) {
				state.cart.splice(index, 1);
			} else {
				state.cart[index].quantity = quantity;
			}
		},
		removeItem (state, action: PayloadAction<{ index: number }>) {
			const {index} = action.payload;
			state.cart.splice(index, 1);
		},
	},
})
