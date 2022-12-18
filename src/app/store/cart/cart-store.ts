import {action, computed, makeObservable, observable} from "mobx";
import {makePersistable, stopPersisting} from "mobx-persist-store";
import {Disposable, singleton} from "tsyringe";
import type {CartItem, Product} from "../../utils/types";

@singleton()
export default class CartStore implements Disposable {
	@observable
	readonly cart: CartItem[] = [];

	constructor () {
		makeObservable(this);
		makePersistable(this, {name: CartStore.name, properties: ["cart"]});
	}

	dispose (): Promise<void> | void {
		stopPersisting(this);
	}

	@action
	addItem (item: Product) {
		const idx = this.cart.findIndex(value => value.id === item.id);
		if (idx === -1) {
			this.cart.push({...item, quantity: 1});
		} else {
			this.cart[idx].quantity++;
		}
	}

	@action
	setItemQuantity (index: number, quantity: number) {
		if (quantity <= 0) {
			this.removeItem(index);
		} else {
			this.cart[index].quantity = quantity;
		}
	}

	@action
	removeItem (index: number) {
		this.cart.splice(index, 1);
	}

	@action
	clear(){
		this.cart.splice(0);
	}

	@computed
	get numItems () {
		let cartItems = 0;
		for (const item of this.cart) {
			cartItems += item.quantity;
		}
		return cartItems;
	}

	@computed
	get totalCost () {
		let cartTotalCost = 0;
		for (const item of this.cart) {
			cartTotalCost += item.quantity * item.price;
		}
		return cartTotalCost;
	}
}
