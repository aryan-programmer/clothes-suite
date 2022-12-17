import {observer} from "mobx-react";
import React from "react";
import {useParams} from "react-router";
import {useResolve} from "../../../lib/injector/useResolve";
import CategoriesStore from "../../store/categories/categories-store";
import {LoaderContainer} from "../common/loader";
import ProductsListWithTitle from "./ProductsListWithTitle";

export type ShopProductsListProps_T = {
	category: string
};
export type ShopCategoryPageProps_T = {};

const ShopProductsList = observer(function ShopProductsList ({category}: ShopProductsListProps_T) {
	const categoriesStore = useResolve(CategoriesStore);
	const products        = categoriesStore.productCategories[category];

	return (
		products == null ?
			<h1 className="text-center">404 Error: A product category with the name "{category}" does not exist.</h1> :
			<ProductsListWithTitle title={category} products={products} />
	);
});

export default observer(function ShopCategoryPage (props: ShopCategoryPageProps_T) {
	const params          = useParams();
	const categoriesStore = useResolve(CategoriesStore);

	return (
		<div className="position-relative">
			{categoriesStore.isLoading ?
				<LoaderContainer /> :
				<ShopProductsList category={params.category ?? ""} />}
		</div>
	);
});
