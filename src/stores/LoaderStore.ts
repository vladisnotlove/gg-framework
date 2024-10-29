import {
	combine,
	createEffect,
	createEvent,
	createStore,
	sample,
} from "effector";
import { loadAsset as loadAssetFn } from "src/utils/asset";

const $ready = createStore(false);
const $loadedCount = createStore(0);
const $totalCount = createStore(0);
const $progress = combine($loadedCount, $totalCount).map(
	([loaded, total]) => loaded / total,
);

const setReady = createEvent();
$ready.on(setReady, () => true);

const loadAssetFx = createEffect(loadAssetFn);
const loadAsset = createEvent<Parameters<typeof loadAssetFn>[0]>();

sample({
	clock: loadAsset,
	source: $ready,
	filter: (ready) => ready,
	fn: (_, asset) => asset,
	target: loadAssetFx,
});

$totalCount.on(loadAssetFx, (prev) => prev + 1);
$loadedCount.on(loadAssetFx.done, (prev) => prev + 1);

export const LoaderStore = {
	$ready,
	$loadedCount,
	$totalCount,
	$progress,

	setReady,
	loadAsset,
};
