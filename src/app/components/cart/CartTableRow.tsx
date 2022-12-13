import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import React, {ChangeEvent, useCallback} from "react";
import {cartSlice} from "../../store/cart/cart-slice";
import {useAppDispatch} from "../../store/store";
import {CartItem} from "../../utils/types";
import Btn from "../common/Btn";
import {ImgThumbnail} from "../common/ImgThumbnail";
import {InputBoxControlledUnlabeled} from "../common/InputBoxes";

export type CartTableRowProps_T = CartItem & {
	index: number,
};

export default function CartTableRow (props: CartTableRowProps_T) {
	const {imageUrl, name, price, quantity, index} = props;

	const dispatch = useAppDispatch();

	const onQuantityChanged = useCallback((ev: ChangeEvent<HTMLInputElement>) => {
		dispatch(cartSlice.actions.setItemQuantity({index, quantity: Math.round(+ev.target.value)}));
	}, [dispatch, index]);

	const onRemove = useCallback(() => {
		dispatch(cartSlice.actions.removeItem({index}));
	}, [dispatch, index]);
	return (
		<tr>
			<td className="d-flex justify-content-align-items-center">
				<ImgThumbnail src={imageUrl} /></td>
			<td>{name}</td>
			<td>
				<InputBoxControlledUnlabeled
					type="number"
					value={quantity}
					onChange={onQuantityChanged}
					min="0"
					max="100"
					required
					step="1" />
			</td>
			<td>{price}</td>
			<td>
				<Btn borderColor="danger" onClick={onRemove}>
					<FontAwesomeIcon icon={["far", "trash-can"]} />
				</Btn>
			</td>
		</tr>
	);
}
