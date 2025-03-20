import { createEvent, createStore } from "effector";

const $data = createStore<{
	mode: "development" | "production";
	safeTop: string;
	safeBottom: string;
} | null>(null);
const $ready = $data.map((state) => state !== null);

const setData = createEvent<{
	mode: "development" | "production";
	safeTop: string;
	safeBottom: string;
}>();

$data.on(setData, (_, payload) => payload);

export const AppDataStore = {
	$data,
	$ready,
	setData,
};
