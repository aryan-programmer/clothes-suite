import React, {ComponentType, createContext, useState} from "react";
import {withContext} from "../../lib/withContext";
import {initProducts} from "../utils/shop-data";
import {Product} from "../utils/types";

export type ProductsContextProps_T = {
	children: any,
}

export type ProductsContextData_T = {
	products: Product[],
	setProducts (value: React.SetStateAction<Product[]>): void;
};

export const ProductsContext = createContext<ProductsContextData_T>({
	products: [],
	setProducts (value: React.SetStateAction<Product[]>) {
	}
});

export function ProductsContextProvider (props: ProductsContextProps_T) {
	const [products, setProducts] = useState<Product[]>(initProducts);
	const value                   = {products, setProducts};
	return (<ProductsContext.Provider value={value}>
		{props.children}
	</ProductsContext.Provider>)
}

export type HasProductsContext_Props_T = {
	ProductsContext: ProductsContextData_T,
}

export function withProductsContext<TProps extends Record<string, any>> (WrappedComponent: ComponentType<TProps>) {
	return withContext(WrappedComponent, "ProductsContext", ProductsContext);
}
