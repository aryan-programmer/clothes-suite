import React from 'react';
import {Route, Routes} from 'react-router-dom';
import AuthenticationPage from "./authentication/Authentication.Page";
import CartPage from "./cart/Cart.Page";
import RoundingFilter from "./common/RoundingFilter";
import HomePage from "./Home.Page";
import NavBarWrapper from "./navigation/NavBarWrapper";
import ShopRoutesPage from "./shop/ShopRoutes.Page";

type AppProps_T = {};

function App (props: AppProps_T) {
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
