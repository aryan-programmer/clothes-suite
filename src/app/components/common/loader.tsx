import React from "react";
import styled from "styled-components";
import {FlexCenter} from "./flex-center";

export const Loader = styled.div`
	animation: rotate 1s infinite;
	height: 50px;
	width: 50px;

	&:before,
	&:after {
		border-radius: 50%;
		content: "";
		display: block;
		height: 20px;
		width: 20px;
	}

	&:before {
		animation: ball1 1s infinite;
		background-color: #fff;
		box-shadow: 30px 0 0 #ff3d00;
		margin-bottom: 10px;
	}

	&:after {
		animation: ball2 1s infinite;
		background-color: #ff3d00;
		box-shadow: 30px 0 0 #fff;
	}

	@keyframes rotate {
		0% {
			transform: rotate(0deg) scale(0.8)
		}
		50% {
			transform: rotate(360deg) scale(1.2)
		}
		100% {
			transform: rotate(720deg) scale(0.8)
		}
	}

	@keyframes ball1 {
		0% {
			box-shadow: 30px 0 0 #ff3d00;
		}
		50% {
			box-shadow: 0 0 0 #ff3d00;
			margin-bottom: 0;
			transform: translate(15px, 15px);
		}
		100% {
			box-shadow: 30px 0 0 #ff3d00;
			margin-bottom: 10px;
		}
	}

	@keyframes ball2 {
		0% {
			box-shadow: 30px 0 0 #fff;
		}
		50% {
			box-shadow: 0 0 0 #fff;
			margin-top: -20px;
			transform: translate(15px, 15px);
		}
		100% {
			box-shadow: 30px 0 0 #fff;
			margin-top: 0;
		}
	}
`;

export const LoaderOverlayDiv = styled.div`
	position: absolute;
	width: 100%;
	height: 100%;
	background-color: #ffffff55;
	z-index: 10000;
	${FlexCenter};
	min-height: 60vh;
	left: 0;
	top: 0;
	right: 0;
	bottom: 0;
`;

export function LoaderContainer () {
	return <LoaderOverlayDiv>
		<Loader />
	</LoaderOverlayDiv>
}
