import React, {useEffect, useState} from 'react';
import {Route, Routes} from 'react-router-dom';
import {overrideThemeVariables, Tab, Tabs} from 'ui-neumorphism';
import NavBar from "./pages/NavBar";
import HomePage from "./pages/HomePage";
import variables from "./style/material-pallete.module.scss";

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
				</Route>
			</Routes>
	);
}

export default App;
