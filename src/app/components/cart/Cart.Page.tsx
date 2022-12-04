import React, {useContext} from "react";
import Table from "react-bootstrap/Table";
import {CartContext} from "../../context/cart.context";
import CartTableRow from "./CartTableRow";

export type CartPageProps_T = {};

export default function CartPage (props: CartPageProps_T) {
	const {cart, totalCost} = useContext(CartContext);
	return (
		<div>
			<h2>Your Cart</h2>
			<div className="el-1 rounded-3 py-3 bg-light-info mx-auto" style={{width: "fit-content"}}>
				<Table striped bordered hover variant="light-info" className="mb-0 w-auto">
					<thead className="">
					<tr>
						<th>Product</th>
						<th>Name</th>
						<th>Quantity</th>
						<th>Price</th>
						<th>Actions</th>
					</tr>
					</thead>
					<tbody>
					{cart.map((value, i) => (
						<CartTableRow item={value} index={i} key={value.id} />
					))}
					<tr className="sticky-bottom">
						<td colSpan={2}></td>
						<td className="h4-imp text-end">Total</td>
						<td className="h4-imp">${totalCost}</td>
						<td></td>
					</tr>
					</tbody>
				</Table>
			</div>
		</div>
	);
}
