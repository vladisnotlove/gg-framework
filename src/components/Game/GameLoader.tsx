import React, { useEffect, useRef, useState } from "react";
import classNames from "classnames";
import { loadAsset, useTranslation } from "src/utils";
import { GameScreen } from "./GameScreen";
import logoImg from "./assets/logo.png";
import "./GameLoader.css";
import { useLoader } from "../../utils";
import { LoaderStore } from "src/stores/LoaderStore";

type GameLoaderProps = {
	className?: string;
	active?: boolean;
	steps?: (() => Promise<any>)[];
};

export const GameLoader: React.FC<GameLoaderProps> = ({
	className,
	active,
	steps = [],
}) => {
	const { translate } = useTranslation();
	const { ready } = useLoader();

	const [progress, setProgress] = useState({
		total: 0,
		passed: 0,
	});

	// todo: refactor this
	useEffect(() => {
		LoaderStore.setProgress(progress.passed / progress.total);
	}, [progress]);

	const stepsRef = useRef([
		() =>
			loadAsset({
				type: "image",
				url: "img/close-tabs.png",
			}),
		() =>
			loadAsset({
				type: "image",
				url: "img/refresh.png",
			}),
		() =>
			loadAsset({
				type: "image",
				url: "img/coin.png",
			}),
		() =>
			loadAsset({
				type: "image",
				url: "img/coin-pattern.png",
			}),
		...steps,
	]);

	useEffect(() => {
		Promise.allSettled([
			loadAsset({
				type: "image",
				url: "img/main-background.png",
			}),
			loadAsset({
				type: "image",
				url: "img/logo.png",
			}),
			loadAsset({
				type: "font",
				url: "font/DelaGothicOne-Regular.ttf",
				family: "Dela Gothic One",
				style: "normal",
				weight: "normal",
			}),
			loadAsset({
				type: "font",
				url: "font/Geologica-Regular.ttf",
				family: "Geologica",
				style: "normal",
				weight: "normal",
			}),
		]).then(() => {
			LoaderStore.setReady();
		});
	}, []);

	useEffect(() => {
		if (!active || !ready || !stepsRef.current) {
			setProgress({
				total: 0,
				passed: 0,
			});
		} else {
			setProgress({
				total: stepsRef.current.length,
				passed: 0,
			});
			const promises = stepsRef.current.map((step) => {
				return step().then(() => {
					setProgress((prev) => {
						return {
							...prev,
							passed: prev.passed + 1,
						};
					});
				});
			});

			Promise.allSettled(promises);
		}
	}, [active, ready]);

	return (
		<GameScreen
			className={classNames("gg-game-loader", className)}
			active={active && ready}
		>
			<img className="gg-game-loader__logo" src={logoImg} alt="" />
			<div className="gg-game-loader__text">
				{translate("Wait for the download...")}
			</div>
			<div className="gg-game-loader__progress">
				<div
					className="gg-game-loader__progress-line"
					style={{ width: `${(progress.passed / progress.total) * 100}%` }}
				></div>
			</div>
		</GameScreen>
	);
};
