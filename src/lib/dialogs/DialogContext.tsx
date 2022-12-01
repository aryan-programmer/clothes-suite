import React, {Component, ComponentType, createContext, JSXElementConstructor, useContext} from "react";

export type DialogComponent_Props_T<TResult, TData = {}> = {
	resolveResult (res: PromiseLike<TResult> | TResult): void;
	onExitTransitionFinished (): void;
	data: TData;
};

export type OpenDialogFn = {
	<TResult, TData> (
		Dialog: JSXElementConstructor<DialogComponent_Props_T<TResult, TData>>,
		data: TData
	): Promise<TResult>;
};

export interface IDialogOpener {
	openDialog<TResult, TData> (
		Dialog: JSXElementConstructor<DialogComponent_Props_T<TResult, TData>>,
		data: TData
	): Promise<TResult>;
}

export const DialogContext = createContext<OpenDialogFn>(
	function () {
		throw new Error("DialogOpener not implemented. Please wrap the main application with DialogOpenerProvider");
	}
);

type DialogProvider_Props_T = {
	children: any,
};

type DialogProvider_State_T = {
	dialog: JSX.Element | null | undefined,
};

export class DialogProvider extends Component<DialogProvider_Props_T, DialogProvider_State_T> implements IDialogOpener {
	constructor (props: DialogProvider_Props_T) {
		super(props);
		this.state = {
			dialog: null
		};
	}

	openDialog = <TResult, TData> (
		Dialog: React.JSXElementConstructor<DialogComponent_Props_T<TResult, TData>>,
		data: TData,
	): Promise<TResult> => {
		return new Promise<TResult>(resolve => {
			this.setState({
				dialog: <Dialog
					resolveResult={resolve}
					onExitTransitionFinished={() => {
						this.setState({dialog: null});
					}}
					data={data} />
			});
		});
	}

	override render () {
		return (
			<DialogContext.Provider value={this.openDialog}>
				{this.props.children}
				{this.state.dialog}
			</DialogContext.Provider>
		);
	}
}

export function useDialog (): OpenDialogFn {
	return useContext(DialogContext);
}

export function withDialog<TProps extends Record<string, any> & IDialogOpener> (
	WrappedComponent: ComponentType<TProps>,
) {
	return (p: Omit<TProps, keyof IDialogOpener>) => {
		return (
			<WrappedComponent
				{...{
					openDialog: useContext(DialogContext),
					...p
				} as TProps}
			/>
		)
	}
}
