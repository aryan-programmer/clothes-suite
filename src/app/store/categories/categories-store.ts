import _ from "lodash";
import {flow, makeObservable, observable} from "mobx";
import {computedFn} from "mobx-utils";
import {singleton} from "tsyringe";
import {assertTypeOf} from "../../../lib/types";
import {getProducts} from "../../utils/firebase/products";
import type {ProductList, ProductsByCategory} from "../../utils/types";
import {isProductsByCategory} from "../../utils/types.guard";

@singleton()
export default class CategoriesStore {
	@observable productCategories: ProductsByCategory = {};
	@observable isLoading: boolean                    = false;

	constructor () {
		makeObservable(this);
	}

	fetchProducts = flow(function* (this: CategoriesStore) {
		this.isLoading = true;
		try {
			const res = yield getProducts();
			assertTypeOf(res, isProductsByCategory);
			this.productCategories = res;
		} finally {
			this.isLoading = false;
		}
	});

	getNProductsInEachCategory = computedFn(function (this: CategoriesStore, n: number) {
		return _.mapValues(this.productCategories, (value) => {
			const products: ProductList = {};
			let i                       = 1;
			for (const product of _.keys(value)) {
				if (i++ > n) break;
				products[product] = value[product];
			}
			return products;
		})
	});
}
