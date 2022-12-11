import React from "react";

export type RoundingFilterProps_T = {};

export const RoundingFilterId = "round";

export default function RoundingFilter (props: RoundingFilterProps_T) {
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
			</defs>
		</svg>
	);
}
