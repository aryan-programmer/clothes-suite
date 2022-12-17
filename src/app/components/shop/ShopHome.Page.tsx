import _ from "lodash";
import {observer} from "mobx-react";
import React, {Fragment} from "react";
import {useResolve} from "../../../lib/injector/useResolve";
import CategoriesStore from "../../store/categories/categories-store";
import {LoaderContainer} from "../common/loader";
import ProductsListWithTitle from "./ProductsListWithTitle";

export type ShopPageProps_T = {};

export default observer(function ShopHomePage (props: ShopPageProps_T) {
	const categoriesStore     = useResolve(CategoriesStore);
	const previewedCategories = categoriesStore.getNProductsInEachCategory(5);
	return (
		<div className="position-relative">
			{categoriesStore.isLoading ?
				<LoaderContainer /> :
				_.map(previewedCategories, (value, key) =>
					<Fragment key={key}>
						<ProductsListWithTitle title={key} products={value} hasLink={`/shop/${key}`} />
						{/*<hr/>*/}
					</Fragment>
				)}
		</div>
	);
});
