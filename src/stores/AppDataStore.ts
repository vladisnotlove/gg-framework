import { createEvent, createStore } from "effector";

const $mode = createStore<"development" | "production" | null>(null);
const $ready = $mode.map((state) => state !== null);

const setMode = createEvent<"development" | "production" | null>();
$mode.on(setMode, (_, mode) => mode);

export const AppDataStore = {
	$mode,
	$ready,
	setMode,
};
