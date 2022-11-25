import React, {useEffect} from 'react';
import {Button, overrideThemeVariables} from 'ui-neumorphism';
import variables from "../style/material-pallete.module.scss";

type AppProps_T = {};

function App (props: AppProps_T) {
	useEffect(() => {
		overrideThemeVariables({
			'--light-bg': 'transparent', // hsl(155,43%,95%,100%)
			'--light-bg-dark-shadow': '#bec8e4',//'hsl(155,41%,82%,50%)',
			'--light-bg-light-shadow': '#ffffff',
			'--primary': variables["blue-300"],
			'--primary-light': variables["blue-200"],
		});
	}, []);
	return (
		<div className="p-3">
		</div>
	);
}

export default App;
