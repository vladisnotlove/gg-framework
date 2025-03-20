import classNames from "classnames";
import React, { useEffect } from "react";
import { loadAsset } from "src/utils/asset";
import {
	AuthStore,
	TranslationStore,
	LoaderStore,
	AppDataStore,
	AdStore,
} from "src/stores";
import {
	useAuth,
	useTranslation,
	useAppData,
	useAd,
	useLoader,
} from "src/utils";
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
	const { ready: loaderReady } = useLoader();
	const { ready: translationReady } = useTranslation();
	const { ready: authReady } = useAuth();
	const { ready: appDataReady } = useAppData();
	const { ready: adReady } = useAd();

	const fullReady =
		loaderReady &&
		translationReady &&
		authReady &&
		appDataReady &&
		(!withAd || (withAd && adReady));

	useNiceInterval(({ stop }) => {
		if (window.translations) {
			TranslationStore.setTranslations(window.translations);
			stop();
		}
	}, 250);

	useNiceInterval(({ stop }) => {
		if (window.token) {
			AuthStore.setToken(window.token);
			stop();
		}
	}, 250);

	useNiceInterval(({ stop }) => {
		if (window.appMode && window.safeTop && window.safeBottom) {
			AppDataStore.setData({
				mode: window.appMode,
				safeBottom: window.safeTop,
				safeTop: window.safeBottom,
			});
			stop();
		}
	}, 250);

	useNiceInterval(
		({ stop }) => {
			if (window.blockId) {
				AdStore.setBlockId(window.blockId);
				stop();
			}
		},
		withAd ? 250 : null,
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
		});
	}, []);

	useEffect(() => {
		if (fullReady) {
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
		}
	}, [fullReady]);

	return (
		<div
			className={classNames(
				"gg-game",
				{
					"gg-game_transparent": transparent,
					"gg-game_ready":
						loaderReady &&
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
