import {User} from "firebase/auth";
import React, {ComponentType, createContext, useEffect, useState} from "react";
import {Optional} from "../../lib/types";
import {withContext} from "../../lib/withContext";
import {createUserDocumentOrOverrideData, onAuthStateChanged} from "../utils/firebase/firebase";

export type UserContextProps_T = {
	children: any,
}

export type UserContextData_T = {
	user: Optional<User>,
	setUser (value: React.SetStateAction<Optional<User>>): void;
};

export const UserContext = createContext<UserContextData_T>({
	user: null,
	setUser (value: React.SetStateAction<Optional<User>>) {
	}
});

export function UserContextProvider (props: UserContextProps_T) {
	const [user, setUser] = useState<Optional<User>>();
	useEffect(() => {
		return onAuthStateChanged(async user => {
			if (user != null)
				await createUserDocumentOrOverrideData(user);
			setUser(user);
		});
	}, []);
	const value = {user, setUser};
	return (<UserContext.Provider value={value}>
		{props.children}
	</UserContext.Provider>)
}

export type HasUserContext_Props_T = {
	UserContext: UserContextData_T,
}

export function withUserContext<TProps extends Record<string, any>> (WrappedComponent: ComponentType<TProps>) {
	return withContext(WrappedComponent, "UserContext", UserContext);
}
