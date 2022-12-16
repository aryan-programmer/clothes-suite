import React, {useEffect} from 'react';
import {Route, Routes} from 'react-router-dom';
import {useOpenDialog} from "../../lib/dialogs/DialogContext";
import {categoriesSlice} from "../store/categories/categories-slice";
import {dialogSlice} from "../store/dialogs/dialogs";
import {useAppDispatch, useAppSelector} from "../store/store";
import {userSlice} from "../store/user/user-slice";
import AuthenticationPage from "./authentication/Authentication.Page";
import CartPage from "./cart/Cart.Page";
import RoundingFilter from "./common/RoundingFilter";
import HomePage from "./Home.Page";
import NavBarWrapper from "./navigation/NavBarWrapper";
import ShopRoutesPage from "./shop/ShopRoutes.Page";

type AppProps_T = {};

function App (props: AppProps_T) {
	const dispatch   = useAppDispatch();
	const openDialog = useOpenDialog();
	const dialog     = useAppSelector(state => state[dialogSlice.name]);

	useEffect(() => {
		if (dialog.Dialog != null && dialog.data != null)
			openDialog(dialog.Dialog, dialog.data).then(() => {
				dispatch(dialogSlice.actions.onDialogClose());
			});
	}, [dialog, dispatch, openDialog]);

	useEffect(() => void dispatch(userSlice.actions.restoreUserSession()), [dispatch]);
	// eslint-disable-next-line react-hooks/exhaustive-deps
	useEffect(() => void dispatch(categoriesSlice.actions.fetchProducts()), []);

	return (
		<>
			<Routes>
				<Route path="/" element={<NavBarWrapper />}>
					<Route index element={<HomePage />} />
					<Route path="/shop/*" element={<ShopRoutesPage />}></Route>
					<Route path="/cart" element={<CartPage />}></Route>
					<Route path="/auth" element={<AuthenticationPage />}></Route>
				</Route>
			</Routes>
			<RoundingFilter />
		</>
	);
}

export default App;
