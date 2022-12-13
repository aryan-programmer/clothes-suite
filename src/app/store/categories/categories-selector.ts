import {createSelector} from "@reduxjs/toolkit";
import _ from "lodash";
import {ProductList} from "../../utils/types";
import {RootState} from "../store";
import {categoriesSlice} from "./categories-slice";

export const selectNProductsInEachCategory = createSelector(
	[
		(state: RootState) => state[categoriesSlice.name].productCategories,
		(state: RootState, n: number) => n
	],
	(productCategories, n) => {
		return _.mapValues(productCategories, (value, key) => {
			const products: ProductList = {};
			let i                       = 1;
			for (const product of _.keys(value)) {
				if (i++ > n) break;
				products[product] = value[product];
			}
			return products;
		})
	}
);
