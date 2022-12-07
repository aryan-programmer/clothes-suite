import React from "react";
import {Route, Routes} from "react-router-dom";
import ShopCategoryPage from "./ShopCategory.Page";
import ShopHomePage from "./ShopHome.Page";

export type ShopRoutesPageProps_T = {};

export default function ShopRoutesPage (props: ShopRoutesPageProps_T) {
	return (
		<Routes>
			<Route index element={<ShopHomePage />} />
			<Route path="/:category" element={<ShopCategoryPage />} />
		</Routes>
	);
}