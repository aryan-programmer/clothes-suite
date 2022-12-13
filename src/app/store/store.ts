import {configureStore} from "@reduxjs/toolkit";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {createLogger} from "redux-logger";
import {cartSlice} from "./cart/cart-slice";
import {categoriesSlice} from "./categories/categories-slice";
import {userSlice} from "./user/user-slice";

const logger = createLogger({
	collapsed: true
});

export const store = configureStore({
	reducer: {
		[userSlice.name]: userSlice.reducer,
		[categoriesSlice.name]: categoriesSlice.reducer,
		[cartSlice.name]: cartSlice.reducer,
	},
	middleware: [logger],
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch               = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
