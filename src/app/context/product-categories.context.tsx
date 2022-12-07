import React, {ComponentType, createContext, useEffect, useState} from "react";
import {withContext} from "../../lib/withContext";
import {getProducts} from "../utils/firebase/products";
import {ProductsByCategory} from "../utils/types";

export type ProductCategoriesContextProps_T = {
	children: any,
}

export type ProductCategoriesContextData_T = {
	productCategories: ProductsByCategory
};

export const ProductCategoriesContext = createContext<ProductCategoriesContextData_T>({
	productCategories: {}
});

export function ProductCategoriesContextProvider (props: ProductCategoriesContextProps_T) {
	const [productCategories, setProductCategories] = useState<ProductsByCategory>({});
	useEffect(() =>
		void (async () => {
			const categoryMap = await getProducts();
			setProductCategories(categoryMap);
		})(), []);
	const value: ProductCategoriesContextData_T = {productCategories: productCategories};
	return (<ProductCategoriesContext.Provider value={value}>
		{props.children}
	</ProductCategoriesContext.Provider>)
}

export type HasProductCategoriesContext_Props_T = {
	ProductsContext: ProductCategoriesContextData_T,
}

export function withProductCategoriesContext<TProps extends Record<string, any>> (WrappedComponent: ComponentType<TProps>) {
	return withContext(WrappedComponent, "ProductsContext", ProductCategoriesContext);
}
