import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import _ from "lodash";
import {observer} from "mobx-react";
import React from "react";
import {Link} from "react-router-dom";
import styled from "styled-components";
import {randomAddress} from "../../../lib/functions/uniq-address";
import {breakpoints} from "../../utils/css";
import {spacing} from "../../utils/spacing";
import {ProductList} from "../../utils/types";
import {HexGrid} from "../common/hexagon-grid/HexGrid";
import ProductCard from "./ProductCard";

export type ProductsPageProps_T = {
	title: string,
	products: ProductList,
	hasLink?: string | false
};

const LinkDisplay       = "i-" + randomAddress();
const LinkDisplaySetter = styled.div`
	& > .${LinkDisplay} {
		.icon {
			width: ${spacing(11)};
			margin-right: ${spacing(2)};
			display: inline-block;
		}

		font-size: 3em;
		//margin: 0 calc(var(--hex-width) * 0.25);
		text-transform: uppercase;
		font-weight: 400;
		@media (max-width: ${breakpoints["sm"]}) {
			//margin: 0 calc(var(--hex-width) * 0.15);
			font-size: 2.5em;
		}
	}
`;

export default observer(function ProductsListWithTitle (props: ProductsPageProps_T) {
	const {title, products} = props;
	const hasLink           = props.hasLink ?? false;
	return (
		<LinkDisplaySetter>
			{/*if */ hasLink !== false ?
				<Link
					className={LinkDisplay + " link link-quaternary"}
					to={hasLink}>
					<div className="icon h-100" />
					{title}
				</Link> :
				<div
					className={LinkDisplay}>
					<Link
						className="link link-tertiary icon"
						to=".."><FontAwesomeIcon icon="arrow-left" /></Link>
					{title}
				</div>}
			<HexGrid className="shadows-bg-primary w-100">
				{_.map(products, (value) => (
					<ProductCard product={value} key={value.id} />
				))}
			</HexGrid>
			<div style={{paddingTop: "calc(var(--hex-height) * 0.25)"}} className="mb-4"></div>
		</LinkDisplaySetter>
	);
});
