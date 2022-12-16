import {configureStore, Middleware} from "@reduxjs/toolkit";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {createLogger} from "redux-logger";
import {persistStore} from "redux-persist";
import {persistedReducer, RootState} from "./root-reducer";
import {rootSaga, sagaMiddleware} from "./root-saga";

const logger = createLogger({
	collapsed: true,
});

const middleware: Middleware<{}, RootState>[] = [
	sagaMiddleware
];
if (process.env.NODE_ENV === "development")
	middleware.push(logger);

export const store = configureStore({
	reducer: persistedReducer,
	middleware: middleware,
});
sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch               = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
