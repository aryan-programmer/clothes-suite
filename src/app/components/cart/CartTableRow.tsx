import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import React, {ChangeEvent} from "react";
import {CartActions, CartContext, CartContextData_T} from "../../context/cart.context";
import {CartItem} from "../../utils/types";
import Btn from "../common/Btn";
import {ImgThumbnail} from "../common/ImgThumbnail";
import {InputBoxControlledUnlabeled} from "../common/InputBoxes";

export type CartTableRowProps_T = {
	item: CartItem,
	index: number,
};
export type CartTableRowState_T = {};

class CartTableRow extends React.Component<CartTableRowProps_T, CartTableRowState_T> {
	static contextType = CartContext;
	context!: CartContextData_T;

	onQuantityChanged = (ev: ChangeEvent<HTMLInputElement>) => {
		this.context.dispatch(CartActions.SetItemQuantity(this.props.index, Math.round(+ev.target.value)));
	}

	onRemove = () => {
		this.context.dispatch(CartActions.RemoveItem(this.props.index));
	}

	override render () {
		const {imageUrl, name, price, quantity} = this.props.item;
		return (
			<tr>
				<td className="d-flex justify-content-align-items-center">
					<ImgThumbnail src={imageUrl} /></td>
				<td>{name}</td>
				<td>
					<InputBoxControlledUnlabeled
						type="number"
						value={quantity}
						onChange={this.onQuantityChanged}
						min="0"
						max="100"
						required
						step="1" />
				</td>
				<td>{price}</td>
				<td>
					<Btn borderColor="danger" onClick={this.onRemove}>
						<FontAwesomeIcon icon={["far", "trash-can"]} />
					</Btn>
				</td>
			</tr>
		);
	}
}

export default CartTableRow;
