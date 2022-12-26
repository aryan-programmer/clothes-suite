import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {observer} from "mobx-react";
import React, {createContext, useCallback, useContext, useEffect, useState} from "react";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Popover from "react-bootstrap/Popover";
import {useMediaQuery} from "react-responsive";
import {useLocation} from "react-router";
import {useMatch} from "react-router-dom";
import styled from "styled-components";
import {useResolve} from "../../../lib/injector/useResolve";
import CartStore from "../../store/cart/cart-store";
import {clamp99} from "../../utils/consts";
import {sideNavBreakpointMinWidth} from "../../utils/css";
import {spacing} from "../../utils/spacing";
import NavLinkWithIcon from "../common/NavLinkWithIcon";
import CartPopover from "./CartPopover";

export type CartNavLinkProps_T = {};

export const ShouldDisplayCartTextContext = createContext(true);

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

const CartNavContent = observer(function CartNavContent () {
	const {numItems}            = useResolve(CartStore);
	const shouldDisplayCartText = useContext(ShouldDisplayCartTextContext);
	return (
		<>
			<CartIcon>
				<FontAwesomeIcon icon="cart-shopping" className="h4-imp mb-0" />
				<CartIconBadge>
					{clamp99(numItems)}
				</CartIconBadge>
			</CartIcon>
			{shouldDisplayCartText ? "Cart" : null}
		</>
	);
});

const CartNavButtonWithPopover = observer(function CartNavButtonWithPopover () {
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
});

export default observer(function CartNavLink (props: CartNavLinkProps_T) {
	const showingSideNav = useMediaQuery({minWidth: sideNavBreakpointMinWidth});

	return (
		showingSideNav ?
			<CartNavButtonWithPopover /> :
			<NavLinkWithIcon to="/cart">
				<CartNavContent />
			</NavLinkWithIcon>
	);
});
