import { createEvent, createStore } from "effector";
import { createTranslateFn } from "../utils/translation/createTranslateFn";

const $translations = createStore<Record<string, string> | null>(null);
const $ready = $translations.map((state) => state !== null);
const $translate = $translations.map((translations) => {
  return createTranslateFn(translations || {}, {
    ignoreError: translations === null,
  });
});

const setTranslations = createEvent<Record<string, string> | null>();
$translations.on(setTranslations, (_, translations) => translations);

export const TranslationStore = {
  $translate,
  $ready,
  setTranslations,
};
