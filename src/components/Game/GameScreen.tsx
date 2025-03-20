import classNames from "classnames";
import React from "react";
import "./GameScreen.css";

type GameScreenProps = React.PropsWithChildren<{
	className?: string;
	active?: boolean;
}>;

export const GameScreen: React.FC<GameScreenProps> = ({
	className,
	active,
	children,
}) => {
	return (
		<div
			className={classNames(
				"gg-game-screen",
				{ "gg-game-screen_active": active },
				"gg-game__screen",
				className,
			)}
		>
			{children}
		</div>
	);
};
