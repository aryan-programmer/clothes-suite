import React, {CSSProperties} from "react";
import {NavLink as BaseNavLink} from "react-router-dom";

export type NavLinkProps_T = React.ComponentProps<typeof BaseNavLink> & {
	activeClassName?: string,
	activeStyle?: CSSProperties
}

export const NavLink = React.forwardRef<HTMLAnchorElement, NavLinkProps_T>(
	({activeClassName, activeStyle, ...props}: NavLinkProps_T, ref: React.ForwardedRef<HTMLAnchorElement>) => {
		return (
			<BaseNavLink
				ref={ref}
				{...props}
				className={({isActive}) =>
					[
						props.className,
						isActive ? activeClassName : null,
					]
						.filter(Boolean)
						.join(" ")
				}
				style={({isActive}) => ({
					...props.style,
					...(isActive ? activeStyle : null),
				})}
			/>
		);
	}
);
