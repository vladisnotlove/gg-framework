import classNames from "classnames";
import React from "react";
import "./Spinner.css";

type SpinnerProps = {
	className?: string;
};

export const Spinner: React.FC<SpinnerProps> = ({ className }) => {
	return (
		<div className={classNames("gg-spinner", className)}>
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
