import React from "react";
import {Outlet} from "react-router-dom";
import {Category} from "../utils/types";
import CategoriesList from "./categories/CategoriesList";

export type HomePageProps_T = {};

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
		title: "Women's",
		icon: "female"
	},
	{
		id: 5,
		title: "Men's",
		icon: "male"
	},
];

export default function HomePage (props: HomePageProps_T) {
	return (
		<>
			<CategoriesList categories={categories} />
			<Outlet />
		</>
	);
}
