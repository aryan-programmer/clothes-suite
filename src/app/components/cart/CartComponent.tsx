import React from "react";
import {Link} from "react-router-dom";
import Btn from "../common/Btn";

export type CartComponentProps_T = {
	showRedirect?: boolean
};

export default function CartComponent (props: CartComponentProps_T) {
	const showRedirect = props.showRedirect ?? false;
	return (
		<div className="">
			Cart component
			{/*if */showRedirect ? (
				<Btn as={Link} className="w-100" to="/cart" borderColor="tertiary">
					Go to checkout
				</Btn>
			) : null /*end if*/}
		</div>
	);
}
