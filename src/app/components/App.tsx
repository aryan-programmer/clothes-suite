import {observer} from "mobx-react";
import React, {useEffect} from 'react';
import {Route, Routes} from 'react-router-dom';
import {useResolve} from "../../lib/injector/useResolve";
import CategoriesStore from "../store/categories/categories-store";
import UserStore from "../store/user/user-store";
import AuthenticationPage from "./authentication/Authentication.Page";
import CartPage from "./cart/Cart.Page";
import RoundingFilter from "./common/RoundingFilter";
import HomePage from "./Home.Page";
import NavBarWrapper from "./navigation/NavBarWrapper";
import PaymentRoutes from "./payment/Payment.Routes";
import ShopRoutes from "./shop/Shop.Routes";

type AppProps_T = {};

function App (props: AppProps_T) {
	const categoriesStore = useResolve(CategoriesStore);
	const userStore       = useResolve(UserStore);

	useEffect(() => {
		categoriesStore.fetchProducts();
		userStore.restoreUser();
		// Only run once
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);


	return (
		<>
			<Routes>
				<Route path="/" element={<NavBarWrapper />}>
					<Route index element={<HomePage />} />
					<Route path="/shop/*" element={<ShopRoutes />}></Route>
					<Route path="/cart" element={<CartPage />}></Route>
					<Route path="/auth" element={<AuthenticationPage />}></Route>
					<Route path="/payment/*" element={<PaymentRoutes />}></Route>
				</Route>
			</Routes>
			<RoundingFilter />
		</>
	);
}

export default observer(App);
