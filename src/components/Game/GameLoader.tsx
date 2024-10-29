import React from "react";
import classNames from "classnames";
import { useTranslation } from "src/utils";
import { GameScreen } from "./GameScreen";
import logoImg from "./assets/logo.png";
import "./GameLoader.css";

type GameLoaderProps = {
	className?: string;
	active?: boolean;
	progress?: number;
};

export const GameLoader: React.FC<GameLoaderProps> = ({
	className,
	active,
	progress = 0,
}) => {
	const { translate } = useTranslation();

	return (
		<GameScreen
			className={classNames("gg-game-loader", className)}
			active={active}
		>
			<img className="gg-game-loader__logo" src={logoImg} alt="" />
			<div className="gg-game-loader__text">
				{translate("Wait for the download...")}
			</div>
			<div className="gg-game-loader__progress">
				<div
					className="gg-game-loader__progress-line"
					style={{ width: `${progress * 100}%` }}
				></div>
			</div>
		</GameScreen>
	);
};
