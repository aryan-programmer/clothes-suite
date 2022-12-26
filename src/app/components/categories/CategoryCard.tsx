import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {observer} from "mobx-react";
import React, {useCallback} from "react";
import {useNavigate} from "react-router";
import styled from "styled-components";
import {breakpoints} from "../../utils/css";
import {spacing} from "../../utils/spacing";
import {Category} from "../../utils/types";
import {HexButton, HexImage} from "../common/hexagon-grid/Hex";

export type CategoriesCardProps_T = {
	cat: Category
};

const CategoryIcon = styled(FontAwesomeIcon)`
	height: 55%;
	@media (max-width: ${breakpoints["sm"]}) {
		height: 35%;
	}
`;

const CategoryHeading = styled.div`
	font-size: 1.5rem;
	text-transform: uppercase;
	margin: ${spacing(1)};
	@media (max-width: ${breakpoints["sm"]}) {
		font-size: 1.1rem;
		margin: ${spacing(0.5)};
	}
`;

export default observer(function CategoryCard ({cat}: CategoriesCardProps_T) {
	const navigate         = useNavigate();
	const navigateCallback = useCallback(() => navigate(`/shop/${cat.title.toLowerCase()}`), [cat.title, navigate]);
	return (
		<HexButton className="bg-gradient--perfect-white" rounded onClick={navigateCallback}>
			<HexImage>
				<CategoryIcon icon={cat.icon} />
				<CategoryHeading>{cat.title}</CategoryHeading>
			</HexImage>
		</HexButton>
	);
});
