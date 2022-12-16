import {SagaIterator} from "redux-saga";
import * as effects from "redux-saga/effects";
import {assertTypeOf} from "../../../lib/types";
import {getProducts} from "../../utils/firebase/products";
import {isProductsByCategory} from "../../utils/types.guard";
import {categoriesSlice} from "./categories-slice";

function* fetchProducts (): SagaIterator {
	try {
		const res = yield effects.call(getProducts);
		assertTypeOf(res, isProductsByCategory);
		yield effects.put(categoriesSlice.actions.fetchedProductsSuccessfully(res));
	} catch (e) {
		yield effects.put(categoriesSlice.actions.fetchProductsFailure());
	}
}

function* onFetchProductsListener (): SagaIterator {
	yield effects.takeLatest(categoriesSlice.actions.fetchProducts, fetchProducts);
}

export function* categoriesSaga (): SagaIterator {
	yield effects.all([effects.call(onFetchProductsListener)]);
}
