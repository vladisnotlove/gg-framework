import { combine, createEvent, createStore } from "effector";
import { AdController } from "../types/Adsgram";

const $blockId = createStore<string | null>(null);
const $adController = createStore<AdController | null>(null);
const $ready = combine({
	$blockId,
	$adController,
}).map((state) => state.$adController !== null && state.$blockId !== null);

const setBlockId = createEvent<string | null>();
const setAdController = createEvent<AdController | null>();

$blockId.on(setBlockId, (_, payload) => payload);
$adController.on(setAdController, (_, payload) => payload);

export const AdStore = {
	$blockId,
	$adController,
	$ready,
	setBlockId,
	setAdController,
};
