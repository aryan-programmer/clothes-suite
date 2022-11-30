import React from "react";
import {Category} from "../utils/types";
import CategoriesCard from "./CategoriesCard";

export type CategoriesListProps_T = {
	categories: Category[],
};

export default function CategoriesList ({categories}: CategoriesListProps_T) {
	return (
		<div className="row gx-4 gy-3 justify-content-center">
			{categories.map(value => (
				<div className="col-12 col-sm-6 col-md-4" key={value.id}>
					<CategoriesCard cat={value} />
				</div>))
			}
		</div>
	);
}
