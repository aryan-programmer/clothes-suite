import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {ProductsByCategory} from "../../utils/types";

export const CATEGORIES_STATE_NAME = "categoriesSlice";

export type CategoriesState_T = {
	productCategories: ProductsByCategory,
	isLoading: boolean
};

const initialState: CategoriesState_T = {
	productCategories: {},
	isLoading: false,
};

export const categoriesSlice = createSlice({
	name: CATEGORIES_STATE_NAME,
	initialState,
	reducers: {
		fetchProducts (state) {
			state.isLoading = true;
		},
		fetchedProductsSuccessfully (state, action: PayloadAction<ProductsByCategory>) {
			state.productCategories = action.payload;
			state.isLoading         = false;
		},
		fetchProductsFailure (state,) {
			state.isLoading = false;
		},
	},
});
