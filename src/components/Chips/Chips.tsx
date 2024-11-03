import classNames from "classnames";
import React from "react";
import coinImg from "../../assets/coin.png";
import "./Chips.css";

type ChipsProps = {
	className?: string;
	value?: number;
	size?: "medium" | "big" | "small";
};

export const Chips: React.FC<ChipsProps> = ({
	className,
	value = "medium",
	size,
}) => {
	return (
		<div
			className={classNames(
				"gg-chips",
				{
					[`gg-chips_${size}`]: true,
				},
				className,
			)}
		>
			<img className="gg-chips__icon" src={coinImg} alt="" />
			{value}
		</div>
	);
};
