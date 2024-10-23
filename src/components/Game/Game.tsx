import classNames from "classnames";
import React from "react";
import useInterval from "use-interval";
import { useAuth, useTranslation } from "src/utils";
import { AuthStore, TranslationStore } from "src/stores";
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
