import {observer} from "mobx-react";
import React from "react";
import CategoriesList from "./categories/CategoriesList";

export type HomePageProps_T = {};

export default observer(function HomePage (props: HomePageProps_T) {
	return (
		<CategoriesList />
	);
});
