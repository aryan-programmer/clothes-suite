import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {observer} from "mobx-react";
import React, {useCallback} from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import {Link} from "react-router-dom";
import {useResolve} from "../../../lib/injector/useResolve";
import UserStore from "../../store/user/user-store";
import {useOpenSuccessDialog} from "../../utils/useOpenErrorDialog";
import CartNavLink from "../cart/CartNavLink";
import NavLinkWithIcon from "../common/NavLinkWithIcon";

type SideNavProps_T = {
	handleClose (): void;
};

export default observer(function SideNavC (props: SideNavProps_T) {
	const userStore         = useResolve(UserStore);
	const openSuccessDialog = useOpenSuccessDialog();
	const signOutCallback   = useCallback(async () => {
		props.handleClose();
		await userStore.signOut();
		await openSuccessDialog("Signed out successfully");
	}, [openSuccessDialog, props, userStore]);
	return (
		<Container className="flex-column h-100">
			<Navbar.Brand as={Link} className="h4 text-wrap text-center fw-bold mx-1" to="/">
				<FontAwesomeIcon icon="boxes-stacked" /><br />Clothes suite
			</Navbar.Brand>
			<Navbar.Toggle aria-controls="basic-navbar-nav" />
			<Navbar.Collapse id="basic-navbar-nav" className="flex-column w-100 px-2 pb-3">
				<Nav className="flex-column w-100 gap-2" variant="pills">
					<NavLinkWithIcon to="/">
						<FontAwesomeIcon icon="home-lg" />
						Home
					</NavLinkWithIcon>
					<NavLinkWithIcon to="/shop">
						<FontAwesomeIcon icon="store" />
						Shop
					</NavLinkWithIcon>
					{/* if */ userStore.user == null ? (
						<NavLinkWithIcon to="/auth">
							<FontAwesomeIcon icon="sign-in" />
							Sign in
						</NavLinkWithIcon>
					) /* else */ : (
						<NavLinkWithIcon
							onClick={signOutCallback}
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
});
