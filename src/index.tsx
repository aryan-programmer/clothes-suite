import React from 'react';
import ReactDOM from 'react-dom/client';
import {app} from './app/init/app-init';
import "./app/init/fontawesome-icons";
import reportWebVitals from './reportWebVitals';
import './style/style.scss';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(app);
reportWebVitals();

// @ts-ignore
if (module.hot) {
	// @ts-ignore
	module.hot.accept();
}
