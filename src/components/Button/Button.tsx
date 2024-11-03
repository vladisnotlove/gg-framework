import classNames from "classnames";
import React from "react";
import "./Button.css";

export type ButtonProps = React.PropsWithChildren<{
	className?: string;
	onClick?: () => void;
	color?: "primary" | "success" | "neutral";
	size?: "medium" | "small";
	disabled?: boolean;
	fullWidth?: boolean;
}>;

export const Button: React.FC<ButtonProps> = ({
	className,
	children,
	onClick,
	color = "primary",
	size = "medium",
	fullWidth,
	disabled,
}) => {
	return (
		<button
			className={classNames(
				"gg-button",
				{
					[`gg-button_${color}`]: true,
					[`gg-button_${size}`]: true,
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
