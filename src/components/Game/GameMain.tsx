import classNames from "classnames";
import React from "react";
import { GameScreen } from "./GameScreen";
import { GameMainLoader } from "./GameMainLoader";
import { useAppData } from "src/utils";
import "./GameMain.css";

type GameMainProps = React.PropsWithChildren<{
	className?: string;
	contentClassName?: string;
	active?: boolean;
	loading?: boolean;
	loadingText?: string;
}>;

export const GameMain: React.FC<GameMainProps> = ({
	className,
	contentClassName,
	active,
	loading,
	loadingText,
	children,
}) => {
	const { safeTop, safeBottom } = useAppData();
	return (
		<GameScreen
			className={classNames("gg-game-main", className)}
			active={active}
		>
			<div
				className={classNames("gg-game-main__content", contentClassName)}
				style={{ top: safeTop, bottom: safeBottom }}
			>
				{children}
			</div>
			<GameMainLoader active={active && loading} text={loadingText} />
		</GameScreen>
	);
};
