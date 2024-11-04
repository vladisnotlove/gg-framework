import classNames from "classnames";
import React from "react";
import { useTranslation } from "src/utils";
import { Spinner } from "../Spinner";
import "./GameMainLoader.css";

type GameMainLoaderProps = {
	className?: string;
	active?: boolean;
	text?: string;
};

export const GameMainLoader: React.FC<GameMainLoaderProps> = ({
	className,
	active,
	text,
}) => {
	const { translate } = useTranslation();

	return (
		<div
			className={classNames(
				"gg-game-main-loader",
				{
					"gg-game-main-loader_active": active,
				},
				className,
			)}
		>
			<div className="gg-game-main-loader__body">
				<div className="gg-game-main-loader__text">
					{text ?? translate("Waiting for a response from server")}
				</div>
				<Spinner className="gg-game-main-loader__spinner" />
			</div>
		</div>
	);
};
