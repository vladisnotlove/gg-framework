import classNames from "classnames";
import React, { useEffect } from "react";
import useInterval from "use-interval";
import { useAuth, useTranslation } from "src/utils";
import { loadAsset } from "src/utils/asset";
import { AuthStore, TranslationStore, LoaderStore } from "src/stores";

import font1 from "../../assets/DelaGothicOne-Regular.ttf";
import font2 from "../../assets/Geologica-Regular.ttf";
import img1 from "../../assets/logo.png";
import img2 from "../../assets/main-background.png";

import img3 from "../../assets/close-tabs.png";
import img4 from "../../assets/big-coin.png";
import img5 from "../../assets/coin.png";
import img6 from "../../assets/refresh.png";

import "./Game.css";

type GameProps = React.PropsWithChildren<{
	className?: string;
	transparent?: string;
}>;

const getTranslations = (() => {
	const defaultTranslations = JSON.parse(process.env.TRANSLATIONS || "{}"); // to avoid object reference changing
	return () => {
		return window.translations || defaultTranslations;
	};
})();

const getToken = () => {
	return (
		window.parent.window.token || window.token || process.env.TOKEN || null
	);
};

export const Game: React.FC<GameProps> = ({
	className,
	transparent,
	children,
}) => {
	const { ready: translationReady } = useTranslation();
	const { ready: authReady } = useAuth();

	useInterval(
		() => {
			const translations = getTranslations();
			if (translations) {
				TranslationStore.setTranslations(translations);
			}
		},
		translationReady ? null : 500,
	);

	useInterval(
		() => {
			const token = getToken();
			if (token) {
				AuthStore.setToken(token);
			}
		},
		authReady ? null : 500,
	);

	useEffect(() => {
		Promise.allSettled([
			loadAsset({
				type: "font",
				url: font1,
				family: "Dela Gothic One",
				style: "normal",
				weight: "normal",
			}),
			loadAsset({
				type: "font",
				url: font2,
				family: "Geologica",
				style: "normal",
				weight: "normal",
			}),
			loadAsset({
				type: "image",
				url: img1,
			}),
			loadAsset({
				type: "image",
				url: img2,
			}),
		]).then(() => {
			LoaderStore.setReady();
			LoaderStore.loadAsset({
				type: "image",
				url: img3,
			});
			LoaderStore.loadAsset({
				type: "image",
				url: img4,
			});
			LoaderStore.loadAsset({
				type: "image",
				url: img5,
			});
			LoaderStore.loadAsset({
				type: "image",
				url: img6,
			});
		});
	}, []);

	return (
		<div
			className={classNames(
				"gg-game",
				{
					"gg-game_transparent": transparent,
					"gg-game_ready": translationReady && authReady,
				},
				className,
			)}
		>
			{children}
		</div>
	);
};
