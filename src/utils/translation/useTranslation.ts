import { useMemo } from "react";
import { useUnit } from "effector-react";
import { TranslationStore } from "src/stores";

export const useTranslation = () => {
	const translate = useUnit(TranslationStore.$translate);
	const ready = useUnit(TranslationStore.$ready);

	return useMemo(() => ({ translate, ready }), [translate, ready]);
};
