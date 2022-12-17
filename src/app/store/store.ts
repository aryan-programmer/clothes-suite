import {configurePersistable} from "mobx-persist-store";

configurePersistable(
	{
		storage: window.localStorage,
		expireIn: 86400000,
		removeOnExpiration: true,
	},
	{delay: 200, fireImmediately: false}
);
