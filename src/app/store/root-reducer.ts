import {combineReducers} from "@reduxjs/toolkit";
import {PersistConfig, persistReducer} from "redux-persist";
import localStorage from "redux-persist/lib/storage";
import {cartSlice} from "./cart/cart-slice";
import {categoriesSlice} from "./categories/categories-slice";
import {dialogSlice} from "./dialogs/dialogs";
import {userSlice} from "./user/user-slice";

const rootReducer = combineReducers({
	[userSlice.name]: userSlice.reducer,
	[categoriesSlice.name]: categoriesSlice.reducer,
	[cartSlice.name]: cartSlice.reducer,
	[dialogSlice.name]: dialogSlice.reducer,
});
export type RootState = ReturnType<typeof rootReducer>;

const persistConfig: PersistConfig<RootState> = {
	key: "root",
	storage: localStorage,
	blacklist: [userSlice.name, dialogSlice.name]
};

export const persistedReducer = persistReducer(persistConfig, rootReducer);
