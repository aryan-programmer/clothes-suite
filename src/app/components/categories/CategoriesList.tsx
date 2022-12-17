import {observer} from "mobx-react";
import React from "react";
import {Category} from "../../utils/types";
import {HexGrid} from "../common/hexagon-grid/HexGrid";
import CategoryCard from "./CategoryCard";

export type CategoriesListProps_T = {};

const categories: Category[] = [
	{
		id: 1,
		title: "Hats",
		icon: "hat-cowboy-side",
	},
	{
		id: 2,
		title: "Jackets",
		icon: "vest",
	},
	{
		id: 3,
		title: "Sneakers",
		icon: "shoe-prints"
	},
	{
		id: 4,
		title: "Womens",
		icon: "female"
	},
	{
		id: 5,
		title: "Mens",
		icon: "male"
	},
];

export default observer(function CategoriesList (props: CategoriesListProps_T) {
	return (
		<HexGrid>
			{categories.map(value => (
				<CategoryCard cat={value} key={value.id} />
			))}
		</HexGrid>
	);
});
