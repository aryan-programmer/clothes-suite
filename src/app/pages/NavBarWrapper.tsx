import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import React, {useCallback, useEffect, useState} from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Offcanvas from "react-bootstrap/Offcanvas";
import {useLocation} from "react-router";
import {Outlet} from "react-router-dom";
import Btn from "../components/common/Btn";
import SideNav from "../components/SideNav";

export type NavBarProps_T = {};

export default function NavBarWrapper (props: NavBarProps_T) {
	const [show, setShow] = useState(false);
	const history         = useLocation()

	const handleClose = useCallback(() => setShow(false), []);
	const handleShow  = useCallback(() => setShow(true), []);

	// eslint-disable-next-line react-hooks/exhaustive-deps
	useEffect(handleClose, [history]);

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
						<SideNav handleClose={handleClose} />
					</Navbar>
				</Offcanvas.Body>
			</Offcanvas>
			<div
				className="row-30 sidenav-sizing align-self-stretch align-items-stretch fixed-top scroll-y shadow-lg">
				<Navbar bg="gradient--salt-mountain" className="el-1 align-items-start p-1">
					<SideNav handleClose={handleClose} />
				</Navbar>
			</div>
			<div className="row-30 content-sizing d-flex justify-content-center">
				<div className="col-30 p-lg-4 p-3 h-100">
					<Outlet />
				</div>
			</div>
		</div>
	);
}
