import React from "react";

export const RoundingFilterId    = "round";
export const InsetShadowFilterId = "inset-shadow";

export default function SVGDefinitions () {
	return (
		<svg
			style={{
				visibility: "hidden", position: "absolute"
			}}
			width="0"
			height="0"
			xmlns="http://www.w3.org/2000/svg"
			version="1.1">
			<defs>
				<filter id={RoundingFilterId}>
					<feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
					<feColorMatrix
						in="blur"
						mode="matrix"
						values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9"
						result="goo" />
					<feComposite in="SourceGraphic" in2="goo" operator="atop" />
				</filter>
				<filter id={InsetShadowFilterId}>
					<feOffset dx="9" dy="9" />
					<feGaussianBlur stdDeviation="10" result="offset-blur" />
					<feComposite operator="out" in="SourceGraphic" in2="offset-blur" result="inverse" />
					<feFlood floodColor="black" floodOpacity="1" result="color" />
					<feComposite operator="in" in="color" in2="inverse" result="shadow" />
					<feComponentTransfer in="shadow" result="shadow">
						<feFuncA type="linear" slope=".85" />
					</feComponentTransfer>

					<feOffset dx="0" dy="0" />
					<feGaussianBlur stdDeviation="10" result="offset-blur2" />
					<feComposite operator="out" in="SourceGraphic" in2="offset-blur2" result="inverse2" />
					<feFlood floodColor="black" floodOpacity="0.25" result="color2" />
					<feComposite operator="in" in="color2" in2="inverse2" result="shadow2" />
					<feComponentTransfer in="shadow2" result="shadow2">
						<feFuncA type="linear" slope=".2" />
					</feComponentTransfer>
					<feComposite operator="over" in="shadow" in2="shadow2" result="res" />
					<feComposite operator="over" in="res" in2="SourceGraphic" />
				</filter>
			</defs>
		</svg>
	);
};
