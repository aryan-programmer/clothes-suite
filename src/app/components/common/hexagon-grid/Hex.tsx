import _ from "lodash";
import {observer} from "mobx-react";
import React, {ComponentProps, ForwardedRef, useEffect, useState} from "react";
import {mergeRefs} from "react-merge-refs";
import styled, {css} from "styled-components";
import {useActive, useHover} from "../../../../lib/functions/useHover";
import {FlexColumnCenter} from "../flex-center";
import {InsetShadowFilterId, RoundingFilterId} from "../SVGDefinitions";

const hexTransitionTimeMs = 150;
const hexActiveTimeMs     = 175;
const hexTransitionAnim   = `${hexTransitionTimeMs / 1000}s ease-in-out`;
const hexTransitionProps  = ["background-color", "filter", "transform", "width", "height"];
const hexTransitions      = _.chain(hexTransitionProps).map(value => `${value} ${hexTransitionAnim}`).join(",").value();

function getFilterDropShadow (m: number) {
	const v = 3 * m;
	const w = 6 * m;
	return css`
			filter: drop-shadow(${v}px ${v}px ${w}px var(--light-bg-dark-shadow)) drop-shadow(-${v}px -${v}px ${w}px var(--light-bg-light-shadow));
	`;
}

export const HexImage = styled.div`
	position: absolute;
	width: var(--hex-image-percentage-size);
	height: var(--hex-image-percentage-size);
	clip-path: polygon(0% 25%, 0% 75%, 50% 100%, 100% 75%, 100% 25%, 50% 0%);
	transition: ${hexTransitions};
	${FlexColumnCenter};
`;

export const HexBody = styled.div`
	position: absolute;
	width: 100%;
	height: 50%;
	top: 25%;
	${FlexColumnCenter};
`;

export const HexCard = styled.div`
	width: 100%;
	height: 100%;
	clip-path: polygon(0% 25%, 0% 75%, 50% 100%, 100% 75%, 100% 25%, 50% 0%);
	${FlexColumnCenter};
`;

export const HexRounded = styled.div`
	filter: url(#${RoundingFilterId});
`;

const HexHover = css`
	${getFilterDropShadow(0.5)};

	${HexCard} {
		cursor: pointer;
	}
`;

const HexInset = css`
	filter: url(#${InsetShadowFilterId});
`;

const HexActive = css`
	${HexInset}
	${HexCard} {
		cursor: pointer;

		& > ${HexImage} {
			width: 100%;
			height: 100%;
		}
	}
`;

export type HexDiv_Props_T = ComponentProps<"div"> & {
	hover?: boolean;
	active?: boolean;
	inset?: boolean;
};

export const HexDiv = styled.div<HexDiv_Props_T>`
	position: relative;
	width: var(--hex-width);
	margin: var(--hex-margin);
	padding-top: var(--hex-height);
	display: inline-block;
	font-size: initial;
	margin-bottom: calc(var(--hex-margin) - var(--hex-height) * 0.25);
	${getFilterDropShadow(1)};
	transition: ${hexTransitions};

	& > ${HexCard}, & > ${HexRounded} {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
	}

	${(props) => (props.active ? HexActive : props.inset ? HexInset : (props.hover ? HexHover : null))}
`;

export type HexButton_Props_T<HexContainer_T extends React.ElementType = typeof HexDiv> = ComponentProps<"div"> & {
	children?: any;
	rounded?: boolean;
	/**
	 * The className for the HexCard
	 */
	className?: string;
	/**
	 * The className for the HexRounded container
	 */
	roundingFilterClassName?: string;
	HexContainer?: HexContainer_T;
	hexContainerProps?: ComponentProps<HexContainer_T>;
};

export const HexButton = observer(React.forwardRef<HTMLDivElement, HexButton_Props_T>(<HexContainer_T extends React.ElementType = typeof HexDiv> (
	props: HexButton_Props_T<HexContainer_T>,
	ref: ForwardedRef<HTMLDivElement>
) => {
	let {className, roundingFilterClassName, children, HexContainer, hexContainerProps, ...cardProps} = props;
	HexContainer ??= HexDiv;

	const [hoverRef, hover]                 = useHover();
	const [activeRef, activeOrig]           = useActive();
	const [active, setActive]               = useState(activeOrig);
	const [inset, setInset]                 = useState(false);
	const [canDeactivate, setCanDeactivate] = useState(false);
	const rounded                           = props.rounded ?? false;

	useEffect(() => {
		if (activeOrig) {
			if (!canDeactivate) {
				setActive(true);
				setCanDeactivate(false);
				setTimeout(() => {
					setCanDeactivate(true);
				}, hexActiveTimeMs);
			}
		} else {
			if (canDeactivate) {
				setActive(false);
				setInset(true);
				setCanDeactivate(false);
				setTimeout(() => {
					setInset(false);
				}, hexTransitionTimeMs);
			}
		}
	}, [activeOrig, canDeactivate]);

	const hexCard = (
		<HexCard
			className={className}
			ref={mergeRefs([hoverRef, activeRef, ref])}
			{...cardProps as any}>{props.children}</HexCard>
	);
	return (
		<HexContainer hover={hover} active={active} inset={inset} {...hexContainerProps as any}>
			{rounded ? <HexRounded className={roundingFilterClassName}>{hexCard}</HexRounded> : hexCard}
		</HexContainer>
	);
}));
