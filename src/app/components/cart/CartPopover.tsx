import React, {useContext} from "react";
import ListGroup from "react-bootstrap/esm/ListGroup";
import {Link} from "react-router-dom";
import {CartContext} from "../../context/cart.context";
import Btn from "../common/Btn";

export type CartComponentProps_T = {
	isSmall?: boolean
};

export default function CartPopover (props: CartComponentProps_T) {
	const {cart} = useContext(CartContext);
	return (
		<div className="mx-auto" style={{maxWidth: "500px"}}>
			<Btn as={Link} className="w-100 mb-2" to="/cart" borderColor="tertiary">
				Go to checkout
			</Btn>
			<ListGroup variant="flush" as="div" className="bg-light-tertiary rounded-4">
				{cart.map(value => (
					<ListGroup.Item key={value.id}>
						<div><span className="mb-0 h5-imp">{value.name}</span>
							<span className="ms-1 fw-normal float-end"></span></div>
						<div>{value.quantity} x ${value.price}</div>
					</ListGroup.Item>
				))}
			</ListGroup>
		</div>
	);
}