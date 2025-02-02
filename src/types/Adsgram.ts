export interface ShowPromiseResult {
	done: boolean;
	description: string;
	state: "load" | "render" | "playing" | "destroy";
	error: boolean;
}

export type BannerType = "RewardedVideo" | "FullscreenMedia";

export interface AdsgramInitParams {
	blockId: string;
	debug?: boolean;
	debugBannerType?: BannerType;
}

export type EventType =
	| "onReward"
	| "onComplete"
	| "onStart"
	| "onSkip"
	| "onBannerNotFound"
	| "onNonStopShow"
	| "onError";
export type HandlerType = () => void;

export interface AdController {
	show(): Promise<ShowPromiseResult>;
	addEventListener(event: EventType, handler: HandlerType): void;
	removeEventListener(event: EventType, handler: HandlerType): void;
	destroy(): void;
}

export type Adsgram = {
	init(params: AdsgramInitParams): AdController;
};
