import _ from "lodash";
import React, {Fragment} from "react";
import {selectNProductsInEachCategory} from "../../store/categories/categories-selector";
import {useAppSelector} from "../../store/store";
import ProductsListWithTitle from "./ProductsListWithTitle";

export type ShopPageProps_T = {};

export default function ShopHomePage (props: ShopPageProps_T) {
	const productCategories = useAppSelector(state => selectNProductsInEachCategory(state, 5));
	return (
		<>
			{_.map(productCategories, (value, key) =>
				<Fragment key={key}>
					<ProductsListWithTitle title={key} products={value} hasLink={`/shop/${key}`} />
					{/*<hr/>*/}
				</Fragment>
			)}
		</>
	);
}
