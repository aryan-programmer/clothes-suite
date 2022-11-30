import React, {useEffect} from 'react';
import {Route, Routes} from 'react-router-dom';
import {overrideThemeVariables} from 'ui-neumorphism';
import NavBar from "./pages/NavBar";
import HomePage from "./pages/HomePage";
import AuthenticationPage from "./pages/AuthenticationPage";
import variables from "./style/material-pallete.module.scss";
import SignUpForm from './components/SignUpForm';

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
			<Routes>
				<Route path="/" element={<NavBar />}>
					<Route index element={<HomePage />}/>
					<Route path="/shop" element={<div>Shop</div>}></Route>
					<Route path="/cart" element={<div>Cart</div>}></Route>
					<Route path="/auth" element={<AuthenticationPage/>}></Route>
				</Route>
			</Routes>
	);
}

export default App;
