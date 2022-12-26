import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {observer} from "mobx-react";
import React, {ChangeEvent, useCallback} from "react";
import {useResolve} from "../../../lib/injector/useResolve";
import CartStore from "../../store/cart/cart-store";
import {CurrencySymbol} from "../../utils/consts";
import Btn from "../common/Btn";
import {ImgThumbnail} from "../common/ImgThumbnail";
import {InputBoxControlledUnlabeled} from "../common/InputBoxes";

export type CartTableRowProps_T = {
	index: number,
};

function useCommon (props: CartTableRowProps_T) {
	const {index}                           = props;
	const cartStore                         = useResolve(CartStore);
	const {imageUrl, name, price, quantity} = cartStore.cart[index];

	const onQuantityChanged = useCallback((ev: ChangeEvent<HTMLInputElement>) => {
		cartStore.setItemQuantity(index, Math.round(+ev.target.value));
	}, [cartStore, index]);

	const onRemove = useCallback(() => {
		cartStore.removeItem(index);
	}, [cartStore, index]);
	return {imageUrl, name, price, quantity, onQuantityChanged, onRemove};
}

export const CartTableRow = observer(function CartTableRow (props: CartTableRowProps_T) {
	const {imageUrl, name, price, quantity, onQuantityChanged, onRemove} = useCommon(props);
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
			<td>{CurrencySymbol}{price}</td>
			<td>
				<Btn borderColor="danger" onClick={onRemove}>
					<FontAwesomeIcon icon={["far", "trash-can"]} />
				</Btn>
			</td>
		</tr>
	);
});

export const CartTableRowSm = observer(function CartTableRow (props: CartTableRowProps_T) {
	const {imageUrl, name, price, quantity, onQuantityChanged, onRemove} = useCommon(props);
	return (
		<tr>
			<td className="d-flex flex-column text-center justify-content-align-items-center">
				<span className="font-smallish">{name}</span>
				<ImgThumbnail src={imageUrl} />
			</td>
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
			<td className="font-monospace text-end">{CurrencySymbol}{price.toFixed(2)}</td>
			<td>
				<div className="d-flex justify-content-center">
					<Btn borderColor="danger" extension="sm" className="mx-auto" onClick={onRemove}>
						<FontAwesomeIcon icon={["far", "trash-can"]} />
					</Btn>
				</div>
			</td>
		</tr>
	);
});

