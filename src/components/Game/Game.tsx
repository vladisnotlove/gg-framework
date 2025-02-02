import classNames from "classnames";
import React, { useEffect } from "react";
import { useUnit } from "effector-react";
import { loadAsset } from "src/utils/asset";
import {
	AuthStore,
	TranslationStore,
	LoaderStore,
	AppDataStore,
	AdStore,
} from "src/stores";
import { useAuth, useTranslation, useAppData, useAd } from "src/utils";
import { useNiceInterval } from "src/utils/useNiceInterval";

import font1 from "../../assets/DelaGothicOne-Regular.ttf";
import font2 from "../../assets/Geologica-Regular.ttf";
import img1 from "../../assets/logo.png";
import img2 from "../../assets/main-background.png";

import img3 from "../../assets/close-tabs.png";
import img4 from "../../assets/big-coin.png";
import img5 from "../../assets/coin.png";
import img6 from "../../assets/refresh.png";

import "./Game.css";

const getTranslations = (() => {
	const defaultTranslations = JSON.parse(
		process.env.DEFAULT_TRANSLATIONS || "{}",
	); // to avoid object reference changing
	return () => {
		return window.translations || defaultTranslations;
	};
})();

const getToken = () => {
	return (
		window.parent.window.token || window.token || process.env.TOKEN || null
	);
};

const getMode = () => {
	return (
		window.parent.window.appMode ||
		window.appMode ||
		process.env.DEFAULT_APP_MODE
	);
};

const getBlockId = () => {
	return window.parent.window.blockId || window.blockId;
};

type GameProps = React.PropsWithChildren<{
	className?: string;
	transparent?: string;
	withAd?: boolean;
}>;

export const Game: React.FC<GameProps> = ({
	className,
	transparent,
	children,
	withAd,
}) => {
	const { ready: translationReady } = useTranslation();
	const { ready: authReady } = useAuth();
	const { ready: appDataReady } = useAppData();
	const { ready: adReady } = useAd();

	const translations = useUnit(TranslationStore.$translations);
	const token = useUnit(AuthStore.$token);
	const mode = useUnit(AppDataStore.$mode);
	const blockId = useUnit(AdStore.$blockId);

	useNiceInterval(
		() => {
			const translations = getTranslations();
			if (translations) {
				TranslationStore.setTranslations(translations);
			}
		},
		translations ? null : 500,
	);

	useNiceInterval(
		() => {
			const token = getToken();
			if (token) {
				AuthStore.setToken(token);
			}
		},
		token ? null : 500,
	);

	useNiceInterval(
		({ round }) => {
			if (round < 4) {
				const mode = getMode();
				if (mode) {
					AppDataStore.setMode(mode);
				}
			} else {
				AppDataStore.setMode("development");
			}
		},
		mode ? null : 500,
	);

	useNiceInterval(
		({ round, stop }) => {
			if (round < 4) {
				const blockId = getBlockId();
				if (blockId) {
					AdStore.setBlockId(blockId);
				}
			} else {
				stop();
			}
		},
		!withAd || (withAd && blockId) ? null : 500,
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
					"gg-game_ready":
						translationReady &&
						authReady &&
						appDataReady &&
						(!withAd || (withAd && adReady)),
				},
				className,
			)}
		>
			{children}
		</div>
	);
};
