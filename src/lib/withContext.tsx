import React, {ComponentType, Context, useContext} from 'react'

export function withContext<TProps extends Record<string, any>, TContextName extends string> (
	WrappedComponent: ComponentType<TProps>,
	contextName: TContextName,
	context: Context<any>,
) {
	return (p: Omit<TProps, TContextName>) => {
		return (
			<WrappedComponent
				{...{
					[contextName]: useContext(context),
					...p
				} as TProps}
			/>
		)
	}
}
