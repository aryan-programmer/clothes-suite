import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import {Link} from "react-router-dom";
import {IDialogOpener, withDialog} from "../../lib/dialogs/DialogContext";
import {HasUserContext_Props_T, withUserContext} from "../context/user.context";
import {signOut} from "../utils/firebase/firebase";
import {Alert} from "../../lib/dialogs/basic-dialogs/Alert";
import {NavLink} from "./NavLink";

export type SideNavOwnProps_T = {
	handleClose (): void;
};
export type SideNavProps_T = SideNavOwnProps_T & HasUserContext_Props_T & IDialogOpener;
export type SideNavState_T = {};

class SideNav extends React.Component<SideNavProps_T, SideNavState_T> {
	constructor (props: SideNavProps_T) {
		super(props);

		this.state = {};
	}

	signOut = async () => {
		this.props.handleClose();
		await signOut();
		await this.props.openDialog(Alert, {
			body: "Signed out successfully"
		});
	};

	override render () {
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
						{/* if */ this.props.userContext.user == null ? (
							<Nav.Link
								className="nav-link-with-icon"
								activeClassName="active"
								as={NavLink} to="/auth">
								<FontAwesomeIcon icon="sign-in" />
								Sign in
							</Nav.Link>
						) /* else */ : (
							<Nav.Link
								className="nav-link-with-icon"
								onClick={this.signOut}>
								<FontAwesomeIcon icon="sign-out" />
								Sign out
							</Nav.Link>
						) /* end if */}
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
}

export default withDialog(withUserContext(SideNav));
