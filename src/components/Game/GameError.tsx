import classNames from "classnames";
import React from "react";
import { Modal } from "../Modal";
import { GameScreen } from "./GameScreen";
import { useTranslation } from "src/utils";
import closeTabsImg from "../../assets/close-tabs.png";
import refreshImg from "../../assets/refresh.png";
import "./GameError.css";

type GameErrorProps = {
	className?: string;
	active?: boolean;
	error?:
		| {
				type: "session";
		  }
		| {
				type: "custom";
				text: string;
		  };
};

export const GameError: React.FC<GameErrorProps> = ({
	className,
	active,
	error,
}) => {
	const { translate } = useTranslation();

	return (
		<GameScreen
			className={classNames("gg-game-error", className)}
			active={active}
		>
			<Modal open>
				{error?.type === "session" && (
					<div className="gg-game-error__window">
						<img
							className="gg-game-error__background"
							src={closeTabsImg}
							alt=""
						/>
						<div className="gg-game-error__text">
							{translate("Close other game tabs...")}
						</div>
					</div>
				)}
				{error?.type === "custom" && (
					<div className="gg-game-error__window" id="errorWindow">
						<div className="gg-game-error__text">{error.text}</div>
						<img src={refreshImg} alt="" className="gg-game-error__img" />
					</div>
				)}
			</Modal>
		</GameScreen>
	);
};
