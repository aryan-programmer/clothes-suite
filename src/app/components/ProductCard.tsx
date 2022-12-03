import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import React, {useEffect, useRef, useState} from "react";
import {Null} from "../../lib/types";
import {fac} from "../utils/consts";
import {Product} from "../utils/types";

export type ProductCardProps_T = {
	product: Product,
};

export default function ProductCard (props: ProductCardProps_T) {
	const {product} = props;
	const [imgAvgColor, setImgAvgColor] = useState("#000");
	const [textColor, setTextColor]     = useState("#fff");
	useEffect(() => {
		fac.getColorAsync(product.imageUrl, {top: 45}).then(value => {
			setImgAvgColor(value.hex);
			setTextColor(value.isDark ? "#fff" : "#000");
		});
	}, [product.imageUrl]);
	return (
		<div className="hex">
			<div className="hex-rounded">
				<div className="hex-card hex-button bg-light justify-content-align-items-center">
					<div className="hex-image">
						<img className="w-100 h-100" src={product.imageUrl} crossOrigin="anonymous" />
					</div>
					<div className="hex-content justify-content-align-items-center flex-column">
						<div
							className="align-self-stretch px-4 justify-content-align-items-center"
							style={{
								color: textColor,
								background: `radial-gradient(closest-side, ${imgAvgColor}, ${imgAvgColor}00)`,
								aspectRatio: "1 / 1.5"
							}}>
							<h2
								className="p-1 py-5 mb-0 text-center"
								style={{lineHeight: "1"}}
							>{product.name} <span className="h5-imp">${product.price}</span></h2>
						</div>
						<div
							className="bg-dark text-white p-2 text-center rounded-pill h3-imp"
							style={{aspectRatio: "1/1"}}>
							<FontAwesomeIcon icon="cart-plus" />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
