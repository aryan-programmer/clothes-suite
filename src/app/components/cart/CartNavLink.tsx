import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import React, {useCallback, useContext, useEffect, useState} from "react";
import Nav from "react-bootstrap/Nav";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Popover from "react-bootstrap/Popover";
import {useLocation} from "react-router";
import {Link, useMatch} from "react-router-dom";
import {CartContext} from "../../context/cart.context";
import {clamp99} from "../../utils/consts";
import {smallestSizeSideNav} from "../../utils/css-vars";
import {Media} from "../../utils/media-breakpoints";
import CartPopover from "./CartPopover";

export type CartNavLinkProps_T = {};

type RenderCartNavProps_T = {};

function CartNavContent (props: RenderCartNavProps_T) {
	const {numItems} = useContext(CartContext);
	return (
		<>
			<div className="cart-icon">
				<FontAwesomeIcon icon="cart-shopping" className="h4-imp mb-0" />
				<span className="cart-icons__items-badge bg-primary">
					{clamp99(numItems)}
				</span>
			</div>
			Cart
		</>
	);
}

export default function CartNavLink (props: CartNavLinkProps_T) {
	const hasMatch                            = useMatch("/cart") != null;
	const [popoverVisible, setPopoverVisible] = useState(false);
	const location                            = useLocation();

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

	let className: string;
	if (hasMatch) {
		className = "nav-link-with-icon active";
	} else if (popoverVisible) {
		className = "nav-link-with-icon active bg-tertiary shadows-bg-tertiary";
	} else {
		className = "nav-link-with-icon";
	}

	return (
		<>
			<Media greaterThanOrEqual={smallestSizeSideNav}>
				<OverlayTrigger
					show={popoverVisible}
					onToggle={onToggle}
					trigger="click"
					placement="right"
					overlay={
						<Popover className="">
							<Popover.Body>
								<CartPopover isSmall />
							</Popover.Body>
						</Popover>
					}
				>
					<Nav.Link className={className}>
						<CartNavContent />
					</Nav.Link>
				</OverlayTrigger>
			</Media>
			<Media lessThan={smallestSizeSideNav}>
				<Nav.Link
					className={className}
					as={Link} to="/cart">
					<CartNavContent />
				</Nav.Link>
			</Media>
		</>
	);
}
