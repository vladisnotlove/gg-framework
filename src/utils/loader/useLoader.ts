import { useUnit } from "effector-react";
import { useMemo } from "react";
import { LoaderStore } from "src/stores/LoaderStore";

export const useLoader = () => {
	const progress = useUnit(LoaderStore.$progress);
	const ready = useUnit(LoaderStore.$ready);

	return useMemo(() => ({ progress, ready }), [progress, ready]);
};
