import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import React, {useCallback, useContext, useEffect, useState} from "react";
import styled from "styled-components";
import {CartContext} from "../../context/cart.context";
import {fac} from "../../utils/consts";
import {shadowsFromColor} from "../../utils/css-vars";
import {spacing} from "../../utils/spacing";
import {Product} from "../../utils/types";
import {FlexCenter} from "../common/flex-center";
import {HexBody, HexButton, HexCard, HexDiv, HexDiv_Props_T, HexImage} from "../common/hexagon-grid/Hex";

export type ProductCardProps_T = {
	product: Product,
};

type ProductImage_TextOverlay_Props_T = {
	textColor: string,
	imgAvgColor: string,
};
const ProductImage_TextOverlay = styled.div<ProductImage_TextOverlay_Props_T>`
	${FlexCenter};
	align-self: stretch;
	color: ${props => props.textColor};
	background: radial-gradient(closest-side, ${props => props.imgAvgColor}, ${props => props.imgAvgColor}00);
	aspect-ratio: 1 / 1.5;
	text-align: center;
	padding: ${spacing(3)} ${spacing(5)};

	& > h3 {
		line-height: 0.9 !important;
	}
`;

type HexButtonContainerWithBg_Props_T = HexDiv_Props_T & {
	backgroundColor: string;
	isDark: boolean;
};
const HexButtonContainerWithBg = styled(HexDiv)<HexButtonContainerWithBg_Props_T>`
	${HexCard} {
		background: ${props => props.backgroundColor};
	}

	${props => props.isDark ? shadowsFromColor(props.backgroundColor, props.isDark) : null}
`;

export default function ProductCard (props: ProductCardProps_T) {
	const {product}                     = props;
	const [imgAvgColor, setImgAvgColor] = useState("#000");
	const [textColor, setTextColor]     = useState("#fff");
	const [isDark, setIsDark]           = useState(false);
	const {addItem}                     = useContext(CartContext);
	const addCurrentItem                = useCallback(() => addItem(product), [addItem, product]);
	useEffect(() => {
		fac.getColorAsync(product.imageUrl, {top: 45}).then(value => {
			setIsDark(value.isDark);
			setImgAvgColor(value.hex);
			setTextColor(value.isDark ? "#fff" : "#000");
		});
	}, [product.imageUrl]);
	return (
		<HexButton
			HexContainer={HexButtonContainerWithBg}
			hexContainerProps={{backgroundColor: imgAvgColor, isDark}}
			rounded
			onClick={addCurrentItem}>
			<HexImage>
				<img
					className="w-100 h-100"
					src={product.imageUrl}
					crossOrigin="anonymous"
					alt={product.name} />
			</HexImage>
			<HexBody>
				<ProductImage_TextOverlay textColor={textColor} imgAvgColor={imgAvgColor}>
					<h3>{product.name} <span className="h5-imp mx-2">${product.price}</span></h3>
				</ProductImage_TextOverlay>
				<div
					className="bg-dark text-white p-2 text-center rounded-pill h3-imp"
					style={{aspectRatio: "1/1"}}>
					<FontAwesomeIcon icon="cart-plus" />
				</div>
			</HexBody>
		</HexButton>
	);
}
