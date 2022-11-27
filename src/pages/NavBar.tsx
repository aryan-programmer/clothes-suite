import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import React, {useState} from "react";
import {Container, Nav, Navbar, Offcanvas} from "react-bootstrap";
import {Link, Outlet} from "react-router-dom";

export type NavBarProps_T = {};

function SideNav () {
	return (
		<Container className="flex-column h-100">
			<Navbar.Brand as={Link} className="h4 text-wrap text-center fw-bold mx-0" to="/">
				<FontAwesomeIcon icon="boxes-stacked" /><br />Clothes suite
			</Navbar.Brand>
			<Navbar.Toggle aria-controls="basic-navbar-nav" />
			<Navbar.Collapse id="basic-navbar-nav" className="flex-column">
				<Nav className="flex-column" variant="pills">
					<Nav.Link className="nav-link-with-icon" as={Link} to="/">
						<FontAwesomeIcon icon="home-lg" />
						Home
					</Nav.Link>
					<Nav.Link className="nav-link-with-icon" as={Link} to="/shop">
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

	const handleClose = () => setShow(false);
	const handleShow  = () => setShow(true);

	return (
		<div className="row-30 vw-100 justify-content-end">
			<Navbar className="topnav-sizing" expand="xs">
				<Container className="justify-content-start gap-2">
					<button
						onClick={handleShow}
						className="h5-imp mb-0 btn border-dark border-1 text-wrap text-center fw-bold mx-0"
						role="button">
						<FontAwesomeIcon icon="bars"></FontAwesomeIcon>
					</button>
					<a className="navbar-brand h4-imp text-wrap fw-bold mx-0">
						<FontAwesomeIcon icon="boxes-stacked" />Clothes suite
					</a>
				</Container>
			</Navbar>
			<Offcanvas show={show} onHide={handleClose} backdropClassName="bg-gradient--salt-mountain">
				<Offcanvas.Body className="bg-gradient--salt-mountain">
					<div className="d-flex w-100 justify-content-end">
						<button className="h5-imp mb-0 btn border-dark border-1 text-wrap text-center fw-bold mx-0" type="button" onClick={handleClose}>
							<FontAwesomeIcon icon="close"></FontAwesomeIcon>
						</button>
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
			<div
				className="row-30 content-sizing d-flex justify-content-center"
			>
				<div className="col-lg-28 col-md-29 col-30 p-3 h-100">
					<Outlet />
				</div>
			</div>
		</div>
	);
}
