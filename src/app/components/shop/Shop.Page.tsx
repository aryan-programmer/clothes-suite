import React, {useContext} from "react";
import {ProductsContext} from "../../context/products.context";
import ProductCard from "./ProductCard";

export type ShopPageProps_T = {};

export default function ShopPage (props: ShopPageProps_T) {
	const {products} = useContext(ProductsContext);
	return (
		<div className="hex-grid-parent">
			<div className="hex-grid shadows-bg-primary">
				{products.map((value, i) => (
					<ProductCard product={value} key={value.id} />
				))}
			</div>
		</div>
	);
}
