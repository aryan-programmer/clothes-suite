import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {observer} from "mobx-react";
import React, {ChangeEvent, useCallback} from "react";
import {useResolve} from "../../../lib/injector/useResolve";
import CartStore from "../../store/cart/cart-store";
import Btn from "../common/Btn";
import {ImgThumbnail} from "../common/ImgThumbnail";
import {InputBoxControlledUnlabeled} from "../common/InputBoxes";

export type CartTableRowProps_T = {
	index: number,
};

export default observer(function CartTableRow (props: CartTableRowProps_T) {
	const {index}                           = props;
	const cartStore                         = useResolve(CartStore);
	const {imageUrl, name, price, quantity} = cartStore.cart[index];

	const onQuantityChanged = useCallback((ev: ChangeEvent<HTMLInputElement>) => {
		cartStore.setItemQuantity(index, Math.round(+ev.target.value));
	}, [index]);

	const onRemove = useCallback(() => {
		cartStore.removeItem(index);
	}, [index]);
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
});
