import React, {useEffect} from 'react';
import {overrideThemeVariables} from 'ui-neumorphism';
import variables from "../style/material-pallete.module.scss";
import {Category} from "../utils/types";
import CategoriesCard from "./CategoriesCard";
import CategoriesList from "./CategoriesList";

type AppProps_T = {};

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

function App (props: AppProps_T) {
	useEffect(() => {
		overrideThemeVariables({
			'--light-bg': 'transparent', // hsl(155,43%,95%,100%)
			'--primary': variables["blue-300"],
			'--primary-light': variables["blue-200"],
		});
	}, []);
	return (
		<div className="p-3">
			<CategoriesList categories={categories}/>
		</div>
	);
}

export default App;
