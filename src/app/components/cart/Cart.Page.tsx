import {observer} from "mobx-react";
import React, {ComponentProps} from "react";
import Table from "react-bootstrap/Table";
import {useMediaQuery} from "react-responsive";
import {Link} from "react-router-dom";
import styled from "styled-components";
import roundToTwo from "../../../lib/functions/roundToTwo";
import {useResolve} from "../../../lib/injector/useResolve";
import CartStore from "../../store/cart/cart-store";
import {CurrencySymbol} from "../../utils/consts";
import {borderRadiusValues, breakpoints} from "../../utils/css";
import {spacing} from "../../utils/spacing";
import Btn from "../common/Btn";
import {CartTableRow, CartTableRowSm} from "./CartTableRow";

let radiusValue = borderRadiusValues["xl"];

const CartTableContainer = styled.div.attrs({
	className: "el-1 bg-gradient--rare-wind"
})`
	border-radius: ${radiusValue};
	padding: 0 0 ${spacing(4)};
	margin: 0 auto;
	width: fit-content;
`;

const CartTable = styled(Table)`
	margin-bottom: 0;
	width: auto;

	& th {
		text-align: center;
	}
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
	className: "font-monospace" as string
})<ComponentProps<"td">>`
	&&& {
		padding: ${spacing(1)};
	}

	font-size: 1.25rem;
	@media (max-width: ${breakpoints["sm"]}) {
		font-size: 1.1rem;
	}

	vertical-align: middle;
`;

export type CartPageProps_T = {};

const CartTableContentRows = observer(function CartTableContentRows () {
	const {cart, totalCost} = useResolve(CartStore);
	return <>
		{cart.map((value, i) => <CartTableRow index={i} key={value.id} />)}
		<tr className="sticky-bottom bg-light-success">
			<td colSpan={2} />
			<TableTotalHeading className="text-end">Total</TableTotalHeading>
			<TableTotalHeading>{CurrencySymbol}{roundToTwo(totalCost)}</TableTotalHeading>
			<TableTotalHeading>
				<Btn as={Link} className="m-2" to="/payment" borderColor="tertiary">
					Pay now
				</Btn>
			</TableTotalHeading>
		</tr>
	</>
});

const CartTableContentRowsSm = observer(function CartTableContentRows () {
	const {cart, totalCost} = useResolve(CartStore);
	return <>
		{cart.map((value, i) => <CartTableRowSm index={i} key={value.id} />)}
		<tr className="sticky-bottom bg-light-success">
			<td />
			<TableTotalHeading className="text-end">Total</TableTotalHeading>
			<TableTotalHeading>{CurrencySymbol}{roundToTwo(totalCost)}</TableTotalHeading>
			<TableTotalHeading>
				<Btn as={Link} rounded="3" to="/payment" extension="sm" borderColor="tertiary">
					Pay now
				</Btn>
			</TableTotalHeading>
		</tr>
	</>
});

export default observer(function CartPage (props: CartPageProps_T) {
	const isSm       = useMediaQuery({maxWidth: breakpoints["sm"]});
	const {numItems} = useResolve(CartStore);
	return (
		<CartTableContainer>
			<CartHeading>Your Cart</CartHeading>
			{isSm ? <CartTable bordered hover striped size="sm">
				<thead>
				<tr>
					<th>Product</th>
					<th>Qty</th>
					<th>Price</th>
					<th></th>
				</tr>
				</thead>
				<tbody>
				{numItems === 0 ?
					<tr>
						<td colSpan={5} className="mb-0 h4-imp text-center">
							Your cart is empty
						</td>
					</tr> :
					<CartTableContentRowsSm />
				}
				</tbody>
			</CartTable> : <CartTable bordered hover striped size="sm">
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
					<CartTableContentRows />
				}
				</tbody>
			</CartTable>}
		</CartTableContainer>
	);
});
