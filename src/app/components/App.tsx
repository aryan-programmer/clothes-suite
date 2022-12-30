import {observer} from "mobx-react";
import React, {lazy, Suspense, useEffect} from 'react';
import {Route, Routes} from 'react-router-dom';
import {useResolve} from "../../lib/injector/useResolve";
import CategoriesStore from "../store/categories/categories-store";
import UserStore from "../store/user/user-store";
import {LoaderContainer} from "./common/loader";
import SVGDefinitions from "./common/SVGDefinitions";
import ScrollToTop from "./common/ScrollToTop";
import HomePage from "./Home.Page";
import NavBarWrapper from "./navigation/NavBarWrapper";

const ShopRoutesLZ         = lazy(() => import("./shop/Shop.Routes"));
const PaymentRoutesLZ      = lazy(() => import("./payment/Payment.Routes"));
const AuthenticationPageLZ = lazy(() => import("./authentication/Authentication.Page"));
const CartPageLZ           = lazy(() => import("./cart/Cart.Page"));

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
		<Suspense fallback={<LoaderContainer />}>
			<ScrollToTop />
			<Routes>
				<Route path="/" element={<NavBarWrapper />}>
					<Route index element={<HomePage />} />
					<Route path="/shop/*" element={<ShopRoutesLZ />}></Route>
					<Route path="/cart" element={<CartPageLZ />}></Route>
					<Route path="/auth" element={<AuthenticationPageLZ />}></Route>
					<Route path="/payment/*" element={<PaymentRoutesLZ />}></Route>
				</Route>
			</Routes>
			<SVGDefinitions />
		</Suspense>
	);
}

export default observer(App);
