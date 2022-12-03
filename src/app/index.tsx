import {library} from '@fortawesome/fontawesome-svg-core';
import {faGoogle} from "@fortawesome/free-brands-svg-icons"
import {
	faBars,
	faBoxesStacked,
	faClose,
	faFemale,
	faHatCowboySide,
	faHomeLg,
	faMale,
	faPlus,
	faShoePrints,
	faShoppingCart,
	faSignIn,
	faSignOut,
	faStore,
	faTShirt,
	faUserPlus,
	faVest,
} from '@fortawesome/free-solid-svg-icons';
import {faCartPlus} from "@fortawesome/free-solid-svg-icons/faCartPlus";
import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter} from "react-router-dom";
import {
	alertDefaultProps,
	AlertPropsContext,
	confirmDefaultProps,
	ConfirmPropsContext
} from "../lib/dialogs/basic-dialogs/DialogBasicProps.context";
import {DialogProvider} from "../lib/dialogs/DialogContext";
import reportWebVitals from '../reportWebVitals';
import '../style/style.scss';
import App from './App';
import {ProductsContextProvider} from "./context/products.context";
import {UserContextProvider} from "./context/user.context";
import {APPLICATION_NAME} from './utils/consts';
import {MediaContextProvider} from "./utils/media-breakpoints";
import {RenderChain} from "./utils/render-chain";

library.add(
	faHatCowboySide,
	faVest,
	faShoePrints,
	faFemale,
	faMale,
	faBoxesStacked,
	faStore,
	faHomeLg,
	faBars,
	faClose,
	faSignIn,
	faSignOut,
	faShoppingCart,
	faTShirt,
	faUserPlus,
	faGoogle,
	faPlus,
	faCartPlus,
)

declare module 'react' {
	interface Attributes {
		children?: any;
	}
}

const root = ReactDOM.createRoot(
	document.getElementById('root') as HTMLElement
);

const app = new RenderChain()
	.add(React.StrictMode, {})
	.add(BrowserRouter, {})
	.add(MediaContextProvider, {})
	.add(AlertPropsContext.Provider, {value: {...alertDefaultProps, title: APPLICATION_NAME}})
	.add(ConfirmPropsContext.Provider, {value: {...confirmDefaultProps, title: APPLICATION_NAME}})
	.add(DialogProvider, {})
	.add(UserContextProvider, {})
	.add(ProductsContextProvider, {})
	.add(App, {})
	.build();

root.render(app);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
