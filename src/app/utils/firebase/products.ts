import {collection, getDocs, query} from "@firebase/firestore";
import {assertTypeOf} from "../../../lib/types";
import {ProductsByCategory} from "../types";
import {isProductList} from "../types.guard";
import * as fdb from "./firestore-db";

export const PRODUCTS_COLLECTION = "products";

/*
// eslint-disable-next-line import/first
import {generateProducts} from "../shop-data";
const generatedProducts = generateProducts();
console.log(generatedProducts);
fdb.batchAddCollection(
	PRODUCTS_COLLECTION,
	Reflect.ownKeys(generatedProducts),
	k => typeof k != "string" ? false : [k, generatedProducts[k]]
)
	.then(() => {
		console.log("Done");
	});
// */

export async function getProducts () {
	const collectionRef = collection(fdb.db, PRODUCTS_COLLECTION);
	const q             = query(collectionRef);
	const qs            = await getDocs(q);
	return qs.docs.reduce<ProductsByCategory>((res, v, i) => {
		const products = v.data();
		assertTypeOf(products, isProductList, "Invalid data retrieved from database");
		res[v.id] = products;
		return res;
	}, {});
}
