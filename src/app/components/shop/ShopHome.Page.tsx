import _ from "lodash";
import React, {Fragment} from "react";
import {selectNProductsInEachCategory} from "../../store/categories/categories-selector";
import {categoriesSlice} from "../../store/categories/categories-slice";
import {useAppSelector} from "../../store/store";
import {LoaderContainer} from "../common/loader";
import ProductsListWithTitle from "./ProductsListWithTitle";

export type ShopPageProps_T = {};

export default function ShopHomePage (props: ShopPageProps_T) {
	const productCategories = useAppSelector(state => selectNProductsInEachCategory(state, 5));
	const isLoading         = useAppSelector(state => state[categoriesSlice.name].isLoading);
	return (
		<div className="position-relative">
			{isLoading ? <LoaderContainer /> : _.map(productCategories, (value, key) =>
				<Fragment key={key}>
					<ProductsListWithTitle title={key} products={value} hasLink={`/shop/${key}`} />
					{/*<hr/>*/}
				</Fragment>
			)}
		</div>
	);
}
