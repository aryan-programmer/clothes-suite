import React, {useEffect} from 'react';
import {Route, Routes} from 'react-router-dom';
import {categoriesSlice} from "../store/categories/categories-slice";
import {useAppDispatch} from "../store/store";
import {userSlice} from "../store/user/user-slice";
import {createUserDocumentOrOverrideData, onAuthStateChanged} from "../utils/firebase";
import {getProducts} from "../utils/firebase/products";
import AuthenticationPage from "./authentication/Authentication.Page";
import CartPage from "./cart/Cart.Page";
import RoundingFilter from "./common/RoundingFilter";
import HomePage from "./Home.Page";
import NavBarWrapper from "./navigation/NavBarWrapper";
import ShopRoutesPage from "./shop/ShopRoutes.Page";

type AppProps_T = {};

function App (props: AppProps_T) {
	const dispatch = useAppDispatch();

	useEffect(() => {
		return onAuthStateChanged(async user => {
			if (user != null)
				await createUserDocumentOrOverrideData(user);
			dispatch(userSlice.actions.setUser(user));
		});
	}, [dispatch]);
	useEffect(() =>
		void (async () => {
			const categoryMap = await getProducts();
			dispatch(categoriesSlice.actions.setProductCategories(categoryMap));
		})(), [dispatch]);

	return (
		<>
			<Routes>
				<Route path="/" element={<NavBarWrapper />}>
					<Route index element={<HomePage />} />
					<Route path="/shop/*" element={<ShopRoutesPage />}></Route>
					<Route path="/cart" element={<CartPage />}></Route>
					<Route path="/auth" element={<AuthenticationPage />}></Route>
				</Route>
			</Routes>
			<RoundingFilter />
		</>
	);
}

export default App;
