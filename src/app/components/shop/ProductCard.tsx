import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {observer} from "mobx-react";
import React, {useCallback, useEffect, useState} from "react";
import styled, {css} from "styled-components";
import {useResolve} from "../../../lib/injector/useResolve";
import CartStore from "../../store/cart/cart-store";
import {CurrencySymbol, fac} from "../../utils/consts";
import {borderRadiusValues, shadowsFromColorCss} from "../../utils/css";
import {spacing} from "../../utils/spacing";
import {Product} from "../../utils/types";
import {FlexCenter} from "../common/flex-center";
import {HexBody, HexButton, HexCard, HexDiv, HexDiv_Props_T, HexImage} from "../common/hexagon-grid/Hex";

export type ProductCardProps_T = {
	product: Product,
};

type ProductImageTextOverlay_Props_T = {
	textColor: string,
	imgAvgColor: string,
};
const ProductImageTextOverlay = observer(styled.div<ProductImageTextOverlay_Props_T>`
	${FlexCenter};
	align-self: stretch;
	color: ${props => props.textColor};
	background: radial-gradient(closest-side, ${props => props.imgAvgColor} 0%, ${props => props.imgAvgColor}77 75%, ${props => props.imgAvgColor}00 100%);
	aspect-ratio: 1 / 1.5;
	text-align: center;
	padding: ${spacing(3)} ${spacing(5)};

	& > h3 {
		line-height: 0.9 !important;
	}
`);

type HexButtonContainerWithBg_Props_T = HexDiv_Props_T & {
	backgroundColor: string;
	isDark: boolean;
};

const HexButtonContainerWithBg = styled(HexDiv)<HexButtonContainerWithBg_Props_T>`
	${props => props.isDark ? css`
		${HexCard} {
			background-color: ${props.backgroundColor} !important;
		}

		${shadowsFromColorCss(props.backgroundColor, props.isDark)}
	` : null}
`;

const CartAddIconDiv = styled.div`
	aspect-ratio: 1 / 1;
	background: black;
	color: white;
	padding: ${spacing(2)};
	text-align: center;
	border-radius: ${borderRadiusValues["pill"]};
`;

export default observer(function ProductCard (props: ProductCardProps_T) {
	const {product}                     = props;
	const [imgAvgColor, setImgAvgColor] = useState("#000");
	const [textColor, setTextColor]     = useState("#fff");
	const [isDark, setIsDark]           = useState(false);
	const cartStore                     = useResolve(CartStore);
	const addCurrentItem                = useCallback(
		() => cartStore.addItem(product),
		[cartStore, product]
	);
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
			className="bg-light"
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
				<ProductImageTextOverlay textColor={textColor} imgAvgColor={imgAvgColor}>
					<h3>{product.name} <span className="h5-imp mx-2">{CurrencySymbol}{product.price}</span></h3>
				</ProductImageTextOverlay>
				<CartAddIconDiv>
					<FontAwesomeIcon icon="cart-plus" />
				</CartAddIconDiv>
			</HexBody>
		</HexButton>
	);
});
