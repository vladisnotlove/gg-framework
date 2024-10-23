import { createEvent, createStore } from "effector";

const $ready = createStore(false);
const $progress = createStore(0);

const setReady = createEvent();
$ready.on(setReady, () => true);

const setProgress = createEvent<number>();
$progress.on(setProgress, (_, value) => value);

export const LoaderStore = {
  $ready,
  $progress,
  setProgress,
  setReady,
};
