import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {observer} from "mobx-react";
import React, {useCallback, useEffect, useState} from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Offcanvas from "react-bootstrap/Offcanvas";
import {useMediaQuery} from "react-responsive";
import {useLocation} from "react-router";
import {Outlet} from "react-router-dom";
import styled from "styled-components";
import {sideNavBreakpointMinWidth} from "../../utils/css";
import {spacing} from "../../utils/spacing";
import CartNavLink, {ShouldDisplayCartTextContext} from "../cart/CartNavLink";
import Btn from "../common/Btn";
import SideNav from "./SideNav";

export type NavBarProps_T = {};

const sidenavWidth    = "120px";
const backgroundName  = "gradient--salt-mountain";
const backgroundClass = "bg-" + backgroundName;

const WrapperDiv = styled.div`
	display: flex;
	flex-wrap: wrap;
	min-height: 100vh;
	align-content: flex-start;
`;

const SidenavNavbar = styled(Navbar).attrs({
	className: `scroll-y shadow-lg el-1 ${backgroundClass}`
})`
	display: flex;
	align-items: stretch;
	align-self: stretch;
	width: ${sidenavWidth};
	height: 100vh;
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	z-index: 1020;
	padding: ${spacing(1)};
`;

const TopNavbar = styled(Navbar).attrs({
	className: `el-1 ${backgroundClass}`,
	expand: true
})`
	position: sticky;
	top: 0;
	z-index: 1020;
	width: 100%;
	padding: ${spacing(3)};
`;

const SidenavOffcanvasBody = styled(Offcanvas.Body).attrs({
	className: backgroundClass
})`
	display: flex;
	flex-direction: column;
	align-items: stretch;
	position: relative;
`;

const SidenavOffcanvasCloseButton = styled(Btn).attrs({})`
	position: absolute;
	top: 0;
	right: 0;
	width: min-content;
	margin: ${spacing(4)};
	z-index: 1000;
`;

const OutletWrapper = styled.div`
	flex-grow: 1;
	height: 100%;
	width: 100%;
	padding: ${spacing(2)};
	@media (min-width: ${sideNavBreakpointMinWidth}) {
		margin-left: ${sidenavWidth};
		padding: ${spacing(3)};
	}
`;

export default observer(function NavBarWrapper (props: NavBarProps_T) {
	const [show, setShow] = useState(false);
	const location        = useLocation()
	const showSideNav     = useMediaQuery({minWidth: sideNavBreakpointMinWidth});

	const handleClose = useCallback(() => setShow(false), []);
	const handleShow  = useCallback(() => setShow(true), []);

	// Call only when the location changes not every time handleClose changes
	// eslint-disable-next-line react-hooks/exhaustive-deps
	useEffect(handleClose, [location]);

	return (
		<WrapperDiv>
			{/* if */ showSideNav ?
				<SidenavNavbar>
					<SideNav handleClose={handleClose} />
				</SidenavNavbar>
				/* else */ :
				<TopNavbar>
					<Container className="justify-content-between align-items-center">
						<Btn onClick={handleShow} borderColor="dark" className="h5-imp fw-bold">
							<FontAwesomeIcon icon="bars"></FontAwesomeIcon>
						</Btn>
						<Navbar.Brand className="h4-imp fw-bold mx-1">
							<FontAwesomeIcon icon="boxes-stacked" className="me-1" />Clothes suite
						</Navbar.Brand>
						<ShouldDisplayCartTextContext.Provider value={false}>
							<Nav variant="pills">
								<CartNavLink />
							</Nav>
						</ShouldDisplayCartTextContext.Provider>
					</Container>
				</TopNavbar>
			}
			<Offcanvas
				show={show}
				onHide={handleClose}
				backdropClassName={backgroundClass}>
				<SidenavOffcanvasBody>
					<SidenavOffcanvasCloseButton
						borderColor="dark"
						className="h5-imp fw-bold"
						onClick={handleClose}>
						<FontAwesomeIcon icon="close"></FontAwesomeIcon>
					</SidenavOffcanvasCloseButton>
					<Navbar className="pt-0" expand={true}>
						<SideNav handleClose={handleClose} />
					</Navbar>
				</SidenavOffcanvasBody>
			</Offcanvas>
			<OutletWrapper>
				<Outlet />
			</OutletWrapper>
		</WrapperDiv>
	);
});
