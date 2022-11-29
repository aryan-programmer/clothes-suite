import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import React, {useEffect, useState} from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Offcanvas from "react-bootstrap/Offcanvas";
import {useLocation} from "react-router";
import {Link, Outlet} from "react-router-dom";
import Btn from "../components/Btn";
import {NavLink} from "../components/NavLink";

export type NavBarProps_T = {};

function SideNav () {
	return (
		<Container className="flex-column h-100">
			<Navbar.Brand as={Link} className="h4 text-wrap text-center fw-bold mx-1" to="/">
				<FontAwesomeIcon icon="boxes-stacked" /><br />Clothes suite
			</Navbar.Brand>
			<Navbar.Toggle aria-controls="basic-navbar-nav" />
			<Navbar.Collapse id="basic-navbar-nav" className="flex-column w-100 px-1">
				<Nav className="flex-column w-100 gap-1" variant="pills">
					<Nav.Link
						className="nav-link-with-icon"
						activeClassName="active"
						as={NavLink}
						to="/">
						<FontAwesomeIcon icon="home-lg" />
						Home
					</Nav.Link>
					<Nav.Link
						className="nav-link-with-icon"
						activeClassName="active"
						as={NavLink} to="/shop">
						<FontAwesomeIcon icon="store" />
						Shop
					</Nav.Link>
					<Nav.Link
						className="nav-link-with-icon"
						activeClassName="active"
						as={NavLink} to="/sign-in">
						<FontAwesomeIcon icon="sign-in" />
						Sign in
					</Nav.Link>
					<Nav.Link
						className="nav-link-with-icon"
						activeClassName="active"
						as={NavLink} to="/sign-up">
						<FontAwesomeIcon icon="user-plus" />
						Sign up
					</Nav.Link>
					<Nav.Link
						className="nav-link-with-icon"
						activeClassName="active"
						as={NavLink} to="/cart">
						<FontAwesomeIcon icon="cart-shopping" />
						Cart
					</Nav.Link>
				</Nav>
			</Navbar.Collapse>
		</Container>
	);
}

export default function NavBar (props: NavBarProps_T) {
	const [show, setShow] = useState(false);
	const history         = useLocation()

	const handleClose = () => setShow(false);
	const handleShow  = () => setShow(true);

	useEffect(handleClose, [history])

	return (
		<div className="row-30 vw-100 justify-content-end">
			<Navbar className="topnav-sizing" expand="xs">
				<Container className="justify-content-start gap-2">
					<Btn
						onClick={handleShow}
						borderColor="dark"
						className="h5-imp mb-0 text-wrap text-center fw-bold mx-0">
						<FontAwesomeIcon icon="bars"></FontAwesomeIcon>
					</Btn>
					<a className="navbar-brand h4-imp text-wrap fw-bold mx-0">
						<FontAwesomeIcon icon="boxes-stacked" />Clothes suite
					</a>
				</Container>
			</Navbar>
			<Offcanvas
				show={show}
				onHide={handleClose}
				backdropClassName="bg-gradient--salt-mountain">
				<Offcanvas.Body className="bg-gradient--salt-mountain">
					<div className="d-flex w-100 justify-content-end">
						<Btn
							borderColor="dark"
							className="h5-imp mb-0 text-wrap text-center fw-bold mx-0"
							onClick={handleClose}>
							<FontAwesomeIcon icon="close"></FontAwesomeIcon>
						</Btn>
					</div>
					<Navbar className="pt-0" expand={true}>
						<SideNav />
					</Navbar>
				</Offcanvas.Body>
			</Offcanvas>
			<div
				className="row-30 sidenav-sizing align-self-stretch align-items-stretch fixed-top scroll-y shadow-lg">
				<Navbar bg="gradient--salt-mountain" className="el-1 align-items-start p-1">
					<SideNav />
				</Navbar>
			</div>
			<div className="row-30 content-sizing d-flex justify-content-center">
				<div className="col-lg-28 col-md-29 col-30 p-3 h-100">
					<Outlet />
				</div>
			</div>
		</div>
	);
}
