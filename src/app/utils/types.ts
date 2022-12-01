import {IconName} from "@fortawesome/fontawesome-common-types";
import {Optional} from "../../lib/types";

export type Category = {
	id: number;
	title: string;
	icon: IconName;
};

export type UserData = {
	id: string;
	email: string;
	photoURL: Optional<string>;
	phoneNumber: Optional<string>;
	displayName: Optional<string>;
	createdAt: Date;
};
