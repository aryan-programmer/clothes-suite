import React, {useEffect} from 'react';
import {Route, Routes} from 'react-router-dom';
import {overrideThemeVariables} from 'ui-neumorphism';
import variables from "../../style/material-pallete.module.scss";
import AuthenticationPage from "./authentication/Authentication.Page";
import CartComponent from "./cart/CartComponent";
import RoundingFilter from "./common/RoundingFilter";
import HomePage from "./Home.Page";
import NavBarWrapper from "./navigation/NavBarWrapper";
import ShopPage from "./shop/Shop.Page";

type AppProps_T = {};

function App (props: AppProps_T) {
	useEffect(() => {
		overrideThemeVariables({
			'--light-bg': 'transparent', // hsl(155,43%,95%,100%)
			'--primary': variables["blue-300"],
			'--primary-light': variables["blue-200"],
		});
	}, []);
	return (
		<>
			<Routes>
				<Route path="/" element={<NavBarWrapper />}>
					<Route index element={<HomePage />} />
					<Route path="/shop" element={<ShopPage />}></Route>
					<Route path="/cart" element={<CartComponent />}></Route>
					<Route path="/auth" element={<AuthenticationPage />}></Route>
				</Route>
			</Routes>
			<RoundingFilter/>
		</>
	);
}

export default App;
