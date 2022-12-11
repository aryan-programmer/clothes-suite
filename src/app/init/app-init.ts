import React from "react";
import {BrowserRouter} from "react-router-dom";
import {
	alertDefaultProps,
	AlertPropsContext,
	confirmDefaultProps,
	ConfirmPropsContext
} from "../../lib/dialogs/basic-dialogs/DialogBasicProps.context";
import {DialogProvider} from "../../lib/dialogs/DialogContext";
import App from "../components/App";
import {HexGridVarsProvider} from "../components/common/hexagon-grid/HexGridVarsProvider";
import {CartContextProvider} from "../context/cart.context";
import {ProductCategoriesContextProvider} from "../context/product-categories.context";
import {UserContextProvider} from "../context/user.context";
import {APPLICATION_NAME} from "../utils/consts";
import {RenderChain} from "../utils/render-chain";

export const app = new RenderChain()
	.add(React.StrictMode, {})
	.add(BrowserRouter, {})
	.add(AlertPropsContext.Provider, {value: {...alertDefaultProps, title: APPLICATION_NAME}})
	.add(ConfirmPropsContext.Provider, {value: {...confirmDefaultProps, title: APPLICATION_NAME}})
	.add(DialogProvider, {})
	.add(UserContextProvider, {})
	.add(ProductCategoriesContextProvider, {})
	.add(CartContextProvider, {})
	.add(HexGridVarsProvider, {})
	.add(App, {})
	.build();
