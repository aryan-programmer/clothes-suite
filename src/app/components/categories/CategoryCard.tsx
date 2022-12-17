import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {observer} from "mobx-react";
import React, {useCallback} from "react";
import {useNavigate} from "react-router";
import {Category} from "../../utils/types";
import {HexButton, HexImage} from "../common/hexagon-grid/Hex";

export type CategoriesCardProps_T = {
	cat: Category
};

export default observer(function CategoryCard ({cat}: CategoriesCardProps_T) {
	const navigate         = useNavigate();
	const navigateCallback = useCallback(() => navigate(`/shop/${cat.title.toLowerCase()}`), [cat.title, navigate]);
	return (
		<HexButton className="bg-gradient--perfect-white" rounded onClick={navigateCallback}>
			<HexImage>
				<FontAwesomeIcon
					icon={cat.icon} id={cat.icon} style={{
					height: "55%"
				}} />
				<div className="h3 m-1 text-uppercase fw-normal">{cat.title}</div>
			</HexImage>
		</HexButton>
	);
});
