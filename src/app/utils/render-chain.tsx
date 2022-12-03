import React, {ComponentType} from "react";
import {Optional} from "../../lib/types";

export type RenderChainComponent = [React.ComponentType<any>, React.ComponentProps<React.ComponentType<any>>];

export class RenderChain {
	private components: RenderChainComponent[] = [];

	add<TProps extends Record<string, any>> (
		v: ComponentType<TProps>,
		props: Omit<TProps, "children">
	): this {
		this.components.push([v, props]);
		return this;
	}

	build () {
		let child: Optional<JSX.Element> = null;
		for (let i = this.components.length - 1; i >= 0; --i) {
			const [Comp, props] = this.components[i];
			child = <Comp {...props}>{child}</Comp>;
		}
		return child;
	}
}
