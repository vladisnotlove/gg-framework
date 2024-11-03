import classNames from "classnames";
import React from "react";
import "./Button.css";

export type ButtonProps = React.PropsWithChildren<{
	className?: string;
	onClick?: () => void;
	color?: "primary" | "success" | "neutral";
	disabled?: boolean;
	fullWidth?: boolean;
}>;

export const Button: React.FC<ButtonProps> = ({
	className,
	onClick,
	disabled,
	color = "primary",
	fullWidth,
	children,
}) => {
	return (
		<button
			className={classNames(
				"gg-button",
				{
					[`gg-button_${color}`]: true,
					"gg-button_full-width": fullWidth,
					"gg-button_disabled": disabled,
				},
				className,
			)}
			onClick={onClick}
		>
			{children}
		</button>
	);
};
