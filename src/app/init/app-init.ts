import {Provider} from "react-redux";
import {BrowserRouter} from "react-router-dom";
import {PersistGate} from "redux-persist/integration/react";
import {
	alertDefaultProps,
	AlertPropsContext,
	confirmDefaultProps,
	ConfirmPropsContext
} from "../../lib/dialogs/basic-dialogs/DialogBasicProps.context";
import {DialogProvider} from "../../lib/dialogs/DialogContext";
import App from "../components/App";
import {HexGridVarsProvider} from "../components/common/hexagon-grid/HexGridVarsProvider";
import {persistor, store} from "../store/store";
import {APPLICATION_NAME} from "../utils/consts";
import {RenderChain} from "../utils/render-chain";

export const app = new RenderChain()
	.add(BrowserRouter, {})
	.add(Provider, {store})
	.add(PersistGate, {persistor})
	.add(AlertPropsContext.Provider, {value: {...alertDefaultProps, title: APPLICATION_NAME}})
	.add(ConfirmPropsContext.Provider, {value: {...confirmDefaultProps, title: APPLICATION_NAME}})
	.add(DialogProvider, {})
	.add(HexGridVarsProvider, {})
	.add(App, {})
	.build();
