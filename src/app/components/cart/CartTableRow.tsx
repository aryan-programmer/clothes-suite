import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import React, {ChangeEvent} from "react";
import {CartContext, CartContextData_T} from "../../context/cart.context";
import {CartItem} from "../../utils/types";
import Btn from "../common/Btn";
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
		this.context.setItemQuantity(this.props.index, Math.round(+ev.target.value));
	}

	onRemove = () => {
		this.context.removeItem(this.props.index);
	}

	override render () {
		const {imageUrl, name, price, quantity} = this.props.item;
		return (
			<tr>
				<td><img className="img-thumbnail-sized img-thumbnail el-1 rounded-3 m-2" src={imageUrl} /></td>
				<td className="">{name}</td>
				<td className="">
					<InputBoxControlledUnlabeled
						type="number"
						value={quantity}
						onChange={this.onQuantityChanged}
						min="0"
						max="100"
						required
						step="1" />
				</td>
				<td className="">{price}</td>
				<td className="">
					<Btn extension="lg" borderColor="danger" className="" onClick={this.onRemove}>
						<FontAwesomeIcon icon={["far", "trash-can"]} />
					</Btn>
				</td>
			</tr>
		);
	}
}

export default CartTableRow;
