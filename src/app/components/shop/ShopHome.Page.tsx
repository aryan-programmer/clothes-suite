import _ from "lodash";
import React, {Fragment, useContext} from "react";
import {ProductCategoriesContext} from "../../context/product-categories.context";
import {ProductList} from "../../utils/types";
import ProductsListWithTitle from "./ProductsListWithTitle";

export type ShopPageProps_T = {};

export default function ShopHomePage (props: ShopPageProps_T) {
	const {productCategories} = useContext(ProductCategoriesContext);
	return (
		<>
			{_.map(productCategories, (value, key) => {
				const products: ProductList = {};
				let i                       = 1;
				for (const product of _.keys(value)) {
					if (i++ > 5) break;
					products[product] = value[product];
				}
				return (
					<Fragment key={key}>
						<ProductsListWithTitle title={key} products={products} hasLink={`/shop/${key}`} />
						{/*<hr/>*/}
					</Fragment>
				);
			})}
		</>
	);
}
