import styled from "styled-components";
import {borderRadiusValues, breakpoints} from "../../utils/css";
import {spacing} from "../../utils/spacing";

export const thumbnailSize   = "135px";
export const thumbnailSizeSm = "25vw";
const breakpoint             = parseInt(thumbnailSize) * 100 / parseInt(thumbnailSizeSm);
export const ImgThumbnail    = styled.img.attrs({
	className: "el-1"
})`
	padding: 0.25rem;
	background-color: #E4EBF5;
	border: 0px solid var(--bs-border-color);
	border-radius: ${borderRadiusValues["xl"]};
	height: auto;
	margin: ${spacing(2)};
	max-height: ${thumbnailSize};
	max-width: ${thumbnailSize};
	@media (max-width: ${breakpoint}px) {
		max-height: ${thumbnailSize};
		max-width: ${thumbnailSizeSm};
		margin: ${spacing(1)};
	}
	@media (max-width: ${breakpoints["sm"]}) {
		padding: 0.15rem;
	}
`;
