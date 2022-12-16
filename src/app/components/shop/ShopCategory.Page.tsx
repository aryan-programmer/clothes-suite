import React, {useEffect, useState} from "react";
import {useParams} from "react-router";
import {categoriesSlice} from "../../store/categories/categories-slice";
import {useAppSelector} from "../../store/store";
import {ProductList} from "../../utils/types";
import {LoaderContainer} from "../common/loader";
import ProductsListWithTitle from "./ProductsListWithTitle";

export type ShopCategoryPageProps_T = {};

export default function ShopCategoryPage (props: ShopCategoryPageProps_T) {
	const params                  = useParams();
	const productCategories       = useAppSelector(state => state[categoriesSlice.name].productCategories);
	const isLoading               = useAppSelector(state => state[categoriesSlice.name].isLoading);
	const [products, setProducts] = useState<ProductList>({});
	const category                = params.category ?? "";
	useEffect(() => {
		setProducts(productCategories[category] ?? {});
	}, [category, productCategories]);

	return (
		<div className="position-relative">
			{isLoading ?
				<LoaderContainer /> :
				<ProductsListWithTitle title={category} products={products} />}
		</div>
	);
}
