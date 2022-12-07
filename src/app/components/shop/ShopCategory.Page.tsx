import React, {useContext, useEffect, useState} from "react";
import {useParams} from "react-router";
import {ProductCategoriesContext} from "../../context/product-categories.context";
import {ProductList} from "../../utils/types";
import ProductsListWithTitle from "./ProductsListWithTitle";

export type ShopCategoryPageProps_T = {};

export default function ShopCategoryPage (props: ShopCategoryPageProps_T) {
	const params                  = useParams();
	const {productCategories}     = useContext(ProductCategoriesContext);
	const [products, setProducts] = useState<ProductList>({});
	const category                = params.category ?? "";
	useEffect(() => {
		setProducts(productCategories[category] ?? {});
	}, [category, productCategories]);

	return (
		<ProductsListWithTitle title={category} products={products} />
	);
}
