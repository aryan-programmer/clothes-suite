import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {ProductsByCategory} from "../../utils/types";

export const CATEGORIES_STATE_NAME = "categoriesSlice";

export type CategoriesState_T = {
	productCategories: ProductsByCategory
};

const initialState: CategoriesState_T = {
	productCategories: {}
};

export const categoriesSlice = createSlice({
	name: CATEGORIES_STATE_NAME,
	initialState,
	reducers: {
		setProductCategories (state, action: PayloadAction<ProductsByCategory>) {
			state.productCategories = action.payload;
		}
	}
});
