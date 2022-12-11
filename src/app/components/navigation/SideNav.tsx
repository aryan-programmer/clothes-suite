import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import {Link} from "react-router-dom";
import {Alert} from "../../../lib/dialogs/basic-dialogs/Alert";
import {IDialogOpener, withDialog} from "../../../lib/dialogs/DialogContext";
import {HasUserContext_Props_T, withUserContext} from "../../context/user.context";
import {signOut} from "../../utils/firebase";
import CartNavLink from "../cart/CartNavLink";
import NavLinkWithIcon from "../common/NavLinkWithIcon";

type SideNavOwnProps_T = {
	handleClose (): void;
};
export type SideNavProps_T = SideNavOwnProps_T & HasUserContext_Props_T & IDialogOpener;
export type SideNavState_T = {};

class SideNavC extends React.Component<SideNavProps_T, SideNavState_T> {
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
				<Navbar.Collapse id="basic-navbar-nav" className="flex-column w-100 px-2">
					<Nav className="flex-column w-100 gap-2" variant="pills">
						<NavLinkWithIcon to="/">
							<FontAwesomeIcon icon="home-lg" />
							Home
						</NavLinkWithIcon>
						<NavLinkWithIcon to="/shop">
							<FontAwesomeIcon icon="store" />
							Shop
						</NavLinkWithIcon>
						{/* if */ this.props.UserContext.user == null ? (
							<NavLinkWithIcon to="/auth">
								<FontAwesomeIcon icon="sign-in" />
								Sign in
							</NavLinkWithIcon>
						) /* else */ : (
							<NavLinkWithIcon
								onClick={this.signOut}
								noRedirect>
								<FontAwesomeIcon icon="sign-out" />
								Sign out
							</NavLinkWithIcon>
						) /* end if */}
						<CartNavLink />
					</Nav>
				</Navbar.Collapse>
			</Container>
		);
	}
}

const SideNav = withDialog(withUserContext(SideNavC));
export default SideNav;
