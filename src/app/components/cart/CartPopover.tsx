import {observer} from "mobx-react";
import React from "react";
import ListGroup from "react-bootstrap/ListGroup";
import {Link} from "react-router-dom";
import {useResolve} from "../../../lib/injector/useResolve";
import CartStore from "../../store/cart/cart-store";
import {CurrencySymbol} from "../../utils/consts";
import {CartItem} from "../../utils/types";
import Btn from "../common/Btn";

export type CartComponentProps_T = {};

const CartPopoverListItem = observer(function CartPopoverListItem ({value}: { value: CartItem }) {
	return <ListGroup.Item>
		<div><span className="mb-0 h5-imp">{value.name}</span>
			<span className="ms-1 fw-normal float-end"></span></div>
		<div>{value.quantity} x {CurrencySymbol}{value.price}</div>
	</ListGroup.Item>
})

export default observer(function CartPopover (props: CartComponentProps_T) {
	const {cart, numItems} = useResolve(CartStore);
	return (
		<div className="mx-auto" style={{maxWidth: "500px"}}>
			<Btn as={Link} className="w-100 mb-2" to="/cart" borderColor="tertiary">
				Go to checkout
			</Btn>
			<ListGroup variant="flush" as="div" className="bg-light-tertiary rounded-4">
				{numItems === 0 ?
					<ListGroup.Item className="mb-0 h5-imp text-center">
						Your cart is empty
					</ListGroup.Item> :
					cart.map((value) => <CartPopoverListItem value={value} key={value.id} />)}
			</ListGroup>
		</div>
	);
});
