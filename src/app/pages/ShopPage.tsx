import React, {useContext, useEffect, useRef, useState} from "react";
import {Null} from "../../lib/types";
import Btn from "../components/common/Btn";
import ProductCard from "../components/ProductCard";
import {ProductsContext} from "../context/products.context";
import {fac} from "../utils/consts";

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
