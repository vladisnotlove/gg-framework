import classNames from "classnames";
import React from "react";
import "./Spinner.css";

type SpinnerProps = {
	className?: string;
	size?: number;
};

export const Spinner: React.FC<SpinnerProps> = ({ className, size }) => {
	return (
		<div
			className={classNames("gg-spinner", className)}
			style={{
				...(size && {
					width: size + "px",
				}),
			}}
		>
			<svg className="gg-spinner__svg" viewBox="22 22 44 44">
				<circle
					className="gg-spinner__circle"
					cx="44"
					cy="44"
					r="20.2"
					fill="none"
				></circle>
			</svg>
		</div>
	);
};
