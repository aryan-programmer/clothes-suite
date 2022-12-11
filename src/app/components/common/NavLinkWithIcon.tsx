import React from "react";
import Nav from "react-bootstrap/Nav";
import {NavLink} from "react-router-dom";
import styled from "styled-components";
import {btnTransition, sideNavBreakpointMinWidth} from "../../utils/css-vars";
import {spacing} from "../../utils/spacing";

const NavLinkWithIcon = styled(Nav.Link).attrs(props => ({
	as: props.noRedirect ?? false ? "div" : NavLink,
	className: "nav-link btn btn-el-1"
}))`
	display: flex;
	flex-direction: row;
	gap: ${spacing(2)};
	padding-left: ${spacing(2)};
	padding-right: ${spacing(2)};
	align-items: center;
	text-align: center;
	transition: ${btnTransition};
	@media (min-width: ${sideNavBreakpointMinWidth}) {
		flex-direction: column;
		gap: 0;
	}
`;
export default NavLinkWithIcon;
