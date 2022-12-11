import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import React, {useCallback, useContext, useEffect, useState} from "react";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Popover from "react-bootstrap/Popover";
import {useMediaQuery} from "react-responsive";
import {useLocation} from "react-router";
import {useMatch} from "react-router-dom";
import styled from "styled-components";
import {CartContext} from "../../context/cart.context";
import {clamp99} from "../../utils/consts";
import {sideNavBreakpointMinWidth} from "../../utils/css-vars";
import {spacing} from "../../utils/spacing";
import NavLinkWithIcon from "../common/NavLinkWithIcon";
import CartPopover from "./CartPopover";

export type CartNavLinkProps_T = {};

const CartIcon = styled.div`
	position: relative;
	margin-top: ${spacing(3)};
`;

const CartIconBadge = styled.span.attrs({
	className: "badge bg-primary"
})`
	position: absolute !important;
	top: 0;
	padding: ${spacing(1)};
	transform: translate(-50%, -50%);
	border-radius: 100em;
`

function CartNavContent () {
	const {numItems} = useContext(CartContext);
	return (
		<>
			<CartIcon>
				<FontAwesomeIcon icon="cart-shopping" className="h4-imp mb-0" />
				<CartIconBadge>
					{clamp99(numItems)}
				</CartIconBadge>
			</CartIcon>
			Cart
		</>
	);
}

function CartNavButtonWithPopover () {
	const [popoverVisible, setPopoverVisible] = useState(false);

	const hasMatch = useMatch("/cart") != null;
	const location = useLocation();

	const onToggle = useCallback(() => {
		if (hasMatch) {
			setPopoverVisible(false);
		} else {
			setPopoverVisible(!popoverVisible)
		}
	}, [hasMatch, popoverVisible]);

	useEffect(() => setPopoverVisible(false), [location]);
	useEffect(() => {
		if (hasMatch) setPopoverVisible(false);
	}, [hasMatch]);

	let className = "";
	if (hasMatch) {
		className = "active";
	} else if (popoverVisible) {
		className = "active bg-tertiary shadows-bg-tertiary";
	}

	return (
		<OverlayTrigger
			show={popoverVisible}
			onToggle={onToggle}
			trigger="click"
			placement="right"
			overlay={
				<Popover className="">
					<Popover.Body>
						<CartPopover />
					</Popover.Body>
				</Popover>
			}
		>
			<NavLinkWithIcon className={className} noRedirect>
				<CartNavContent />
			</NavLinkWithIcon>
		</OverlayTrigger>
	);
}

export default function CartNavLink (props: CartNavLinkProps_T) {
	const showingSideNav = useMediaQuery({minWidth: sideNavBreakpointMinWidth});

	return (
		showingSideNav ?
			<CartNavButtonWithPopover />
			:
			<NavLinkWithIcon to="/cart">
				<CartNavContent />
			</NavLinkWithIcon>
	);
}
