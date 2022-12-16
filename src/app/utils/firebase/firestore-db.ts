import {User} from "@firebase/auth";
import {
	collection,
	doc,
	DocumentData,
	DocumentReference,
	getDoc,
	getFirestore,
	setDoc,
	writeBatch,
} from "@firebase/firestore";
import nn from "../../../lib/functions/nn";
import {UserData} from "../types";
import {firebaseApp} from "./firebase-app";

export const db = getFirestore(firebaseApp);

export async function createUserDocumentOrOverrideData (user: User, overridingData?: Partial<UserData>) {
	const userDoc  = doc(db, 'users', user.uid) as DocumentReference<UserData>;
	const userSnap = await getDoc(userDoc);
	if (!userSnap.exists() || overridingData != null) {
		const {email, displayName, phoneNumber, photoURL} = user;
		const createdAt                                   = new Date();
		try {
			await setDoc(userDoc, {
				id: user.uid,
				email: nn(email),
				displayName,
				phoneNumber,
				photoURL,
				createdAt,
				...overridingData,
			});
		} catch (error) {
			console.error("Failed to set user metadata", error)
			throw error;
		}
	}
	return userDoc;
}

export async function batchAddCollection<T, K extends keyof DocumentData> (
	collKey: string,
	data: T[],
	mapper: (v: T, i: number) => [string, Pick<DocumentData, K>] | false
) {
	const collectionRef = collection(db, collKey);
	const batch         = writeBatch(db);
	const len           = data.length;
	for (let i = 0; i < len; i++) {
		const mv = mapper(data[i], i);
		if (mv === false) continue;
		const [key, value] = mv;
		const docRef       = doc(collectionRef, key);
		batch.set(docRef, value);
	}

	await batch.commit();
}
