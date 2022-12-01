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
	faShoePrints,
	faShoppingCart,
	faSignIn,
	faSignOut,
	faStore,
	faTShirt,
	faUserPlus,
	faVest,
} from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter} from "react-router-dom";
import {DialogProvider} from "../lib/dialogs/DialogContext";
import reportWebVitals from '../reportWebVitals';
import '../style/style.scss';
import App from './App';
import {
	alertDefaultProps,
	AlertPropsContext,
	confirmDefaultProps,
	ConfirmPropsContext
} from "../lib/dialogs/basic-dialogs/DialogBasicProps.context";
import {UserContextProvider} from "./context/user.context";
import {APPLICATION_NAME} from './utils/consts';

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
)

declare module 'react' {
	interface Attributes {
		children?: any;
	}
}

const root = ReactDOM.createRoot(
	document.getElementById('root') as HTMLElement
);
root.render(
	<React.StrictMode>
		<BrowserRouter>
			<AlertPropsContext.Provider value={{...alertDefaultProps, title: APPLICATION_NAME}}>
				<ConfirmPropsContext.Provider value={{...confirmDefaultProps, title: APPLICATION_NAME}}>
					<DialogProvider>
						<UserContextProvider>
							<App />
						</UserContextProvider>
					</DialogProvider>
				</ConfirmPropsContext.Provider>
			</AlertPropsContext.Provider>
		</BrowserRouter>
	</React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
