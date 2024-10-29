import classNames from "classnames";
import React, { useEffect } from "react";
import useInterval from "use-interval";
import { useAuth, useTranslation } from "src/utils";
import { loadAsset } from "src/utils/asset";
import { AuthStore, TranslationStore, LoaderStore } from "src/stores";
import "./Game.css";

type GameProps = React.PropsWithChildren<{
	className?: string;
	transparent?: string;
}>;

const getTranslations = (() => {
	const defaultTranslations = JSON.parse(process.env.DEFAULT_TRANSLATIONS); // to avoid object reference changing
	return () => {
		return window.translations || defaultTranslations;
	};
})();

const getToken = () => {
	return (
		window.parent.window.token ||
		window.token ||
		process.env.DEFAULT_TOKEN ||
		null
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

	return (
		<div
			className={classNames(
				"gg-game",
				{ transparent, ready: translationReady },
				className,
			)}
		>
			{children}
		</div>
	);
};
