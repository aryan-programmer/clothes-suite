import createSagaMiddleware from "redux-saga";
import * as effects from "redux-saga/effects";
import {categoriesSaga} from "./categories/categories-saga";
import {userSaga} from "./user/user-saga";

export function* rootSaga () {
	yield effects.all([effects.call(categoriesSaga), effects.call(userSaga)]);
}

export const sagaMiddleware = createSagaMiddleware();
