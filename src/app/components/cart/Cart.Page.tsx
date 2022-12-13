import React, {ComponentProps} from "react";
import Table from "react-bootstrap/Table";
import styled from "styled-components";
import roundToTwo from "../../../lib/functions/roundToTwo";
import {selectCart, selectNumCartItems, selectTotalCartPrice} from "../../store/cart/cart-selectors";
import {useAppSelector} from "../../store/store";
import {borderRadiusValues} from "../../utils/css-vars";
import {spacing} from "../../utils/spacing";
import CartTableRow from "./CartTableRow";

let radiusValue          = borderRadiusValues["xl"];
const CartTableContainer = styled.div.attrs({
	className: "el-1 bg-gradient--rare-wind"
})`
	border-radius: ${radiusValue};
	padding: 0 0 ${spacing(4)};
	margin: 0 auto;
	width: fit-content;
`;

const CartHeading = styled.h2.attrs({
	className: "add-bg-noise"
})`
	border-radius: ${radiusValue} ${radiusValue} 0 0;
	padding-top: ${spacing(3)};
	width: 100%;
	text-align: center;
`;

const TableTotalHeading = styled.td.attrs({
	className: "h4-imp font-monospace" as string
})<ComponentProps<"td">>`
	&&& {
		padding: ${spacing(1)};
	}
`;

export type CartPageProps_T = {};

export default function CartPage (props: CartPageProps_T) {
	const cart      = useAppSelector(selectCart);
	const numItems  = useAppSelector(selectNumCartItems);
	const totalCost = useAppSelector(selectTotalCartPrice);
	return (
		<CartTableContainer>
			<CartHeading>Your Cart</CartHeading>
			<Table bordered hover striped className="mb-0 w-auto">
				<thead>
				<tr>
					<th>Product</th>
					<th>Name</th>
					<th>Quantity</th>
					<th>Price</th>
					<th>Actions</th>
				</tr>
				</thead>
				<tbody>
				{numItems === 0 ?
					<tr>
						<td colSpan={5} className="mb-0 h4-imp text-center">
							Your cart is empty
						</td>
					</tr> :
					cart.map((value, i) => (
						<CartTableRow {...value} index={i} key={value.id} />
					))
				}
				<tr className="sticky-bottom bg-light-success">
					<td colSpan={2} />
					<TableTotalHeading className="text-end">Total</TableTotalHeading>
					<TableTotalHeading>${roundToTwo(totalCost)}</TableTotalHeading>
					<td />
				</tr>
				</tbody>
			</Table>
		</CartTableContainer>
	);
}
