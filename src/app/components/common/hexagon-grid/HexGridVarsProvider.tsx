import styled from "styled-components";
import {breakpointMax, breakpoints} from "../../../utils/css";
import {HexDiv} from "./Hex";
import {HexGrid} from "./HexGrid";

//const smMin  = breakpoints["sm"];
const mdMax  = breakpointMax("md");
const cutoff = "750px";

export const HexGridVarsProvider = styled.div`
	--hex-width: calc(var(--hex-width-orig) - var(--hex-margin) * 2 - 1px);
	--hex-height: calc(var(--hex-width) * 1.1547);
	--hex-margin: 12px;

	/* HEXAGON SIZING AND EVEN ROW INDENTATION */
	@media (min-width: ${breakpoints["lg"]}) {
		/* 5-4  hexagons per row */
		--hex-width-orig: 20%;
		${HexGrid} > ${HexDiv}:nth-child(9n+6) {
			margin-left: calc(10% + var(--hex-margin));
		}
	}
	@media (min-width: ${breakpoints["md"]})and (max-width: ${breakpointMax("lg")}) {
		/* 4-3  hexagons per row */
		--hex-width-orig: 25%;
		${HexGrid} > ${HexDiv}:nth-child(7n+5) {
			margin-left: calc(12.5% + var(--hex-margin));
		}
	}
	@media (min-width: ${cutoff}) and (max-width: ${mdMax}) {
		/* 3-2  hexagons per row */
		--hex-width-orig: 33.333%;
		${HexGrid} > ${HexDiv}:nth-child(5n+4) {
			margin-left: calc(16.666% + var(--hex-margin));
		}
	}
	@media (max-width: ${cutoff}) {
		/* 2-1  hexagons per row */
		--hex-width-orig: 50%;
		${HexGrid} > ${HexDiv}:nth-child(3n+3) {
			margin-left: calc(25% + var(--hex-margin));
		}
	}
`
