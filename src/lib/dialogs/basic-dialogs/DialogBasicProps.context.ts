import {createContext} from "react";

export type DialogBasicProps = {
	title: string;
	backgroundColor: string;
	okText: string;
	cancelText: string;
	okBorderColor: string;
	cancelBorderColor: string;
	okClassName: string;
	cancelClassName: string;
	backdrop: boolean | 'static';
	showClose: boolean;
	className: string;
	backdropClassName: string;
	contentClassName: string;
	dialogClassName: string;
};

export const alertDefaultProps: DialogBasicProps = {
	title: "",
	backgroundColor: "light-primary",
	okText: "OK",
	cancelText: "Cancel",
	okBorderColor: "quaternary",
	cancelBorderColor: "quaternary",
	okClassName: "",
	cancelClassName: "",
	backdrop: true,
	showClose: true,
	className: "",
	contentClassName: "",
	backdropClassName: "",
	dialogClassName: "",
};
export const AlertPropsContext                   = createContext<DialogBasicProps>(alertDefaultProps);

export const confirmDefaultProps: DialogBasicProps = {
	title: "",
	backgroundColor: "light-primary",
	okText: "OK",
	cancelText: "Cancel",
	okBorderColor: "primary",
	cancelBorderColor: "danger",
	okClassName: "",
	cancelClassName: "",
	backdrop: "static",
	showClose: true,
	className: "",
	contentClassName: "",
	backdropClassName: "",
	dialogClassName: "",
};
export const ConfirmPropsContext                   = createContext<DialogBasicProps>(confirmDefaultProps);
