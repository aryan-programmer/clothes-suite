import _ from "lodash";
import React from "react";
import {Link} from "react-router-dom";
import {ProductList} from "../../utils/types";
import {HexGrid} from "../common/hexagon-grid/HexGrid";
import ProductCard from "./ProductCard";

export type ProductsPageProps_T = {
	title: string,
	products: ProductList,
	hasLink?: string | false
};

export default function ProductsListWithTitle (props: ProductsPageProps_T) {
	const {title, products} = props;
	const hasLink           = props.hasLink ?? false;
	return (
		<div>
			{/*if */ hasLink !== false ?
				<Link
					className="display-2 link link-quaternary text-uppercase fw-normal text-decoration-none"
					to={hasLink}
					style={{
						marginLeft: "calc(var(--hex-width) * 0.25)"
					}}>{title}</Link> :
				<div
					className="display-2 text-uppercase fw-normal text-decoration-none"
					style={{
						marginLeft: "calc(var(--hex-width) * 0.25)"
					}}>{title}</div>}
			<HexGrid className="shadows-bg-primary w-100">
				{_.map(products, (value) => (
					<ProductCard product={value} key={value.id} />
				))}
			</HexGrid>
			<div style={{paddingTop: "calc(var(--hex-height) * 0.25)"}} className="mb-4"></div>
		</div>
	);
}
