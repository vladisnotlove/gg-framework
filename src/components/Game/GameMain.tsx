import classNames from "classnames";
import React from "react";
import { GameScreen } from "./GameScreen";
import { GameMainLoader } from "./GameMainLoader";

type GameMainProps = React.PropsWithChildren<{
	className?: string;
	active?: boolean;
	loading?: boolean;
	loadingText?: string;
}>;

export const GameMain: React.FC<GameMainProps> = ({
	className,
	active,
	loading,
	loadingText,
	children,
}) => {
	return (
		<GameScreen
			className={classNames("gg-game-main", className)}
			active={active}
		>
			{children}
			<GameMainLoader active={active && loading} text={loadingText} />
		</GameScreen>
	);
};
