import React, {useEffect} from 'react';
import {Route, Routes} from 'react-router-dom';
import {overrideThemeVariables} from 'ui-neumorphism';
import variables from "../style/material-pallete.module.scss";
import CartComponent from "./components/CartComponent";
import AuthenticationPage from "./pages/AuthenticationPage";
import HomePage from "./pages/HomePage";
import NavBarWrapper from "./pages/NavBarWrapper";
import ShopPage from "./pages/ShopPage";

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
			<svg
				style={{
					visibility: "hidden", position: "absolute"
				}}
				width="0"
				height="0"
				xmlns="http://www.w3.org/2000/svg"
				version="1.1">
				<defs>
					<filter id="round">
						<feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
						<feColorMatrix
							in="blur"
							mode="matrix"
							values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9"
							result="goo" />
						<feComposite in="SourceGraphic" in2="goo" operator="atop" />
					</filter>
				</defs>
			</svg>
		</>
	);
}

export default App;
