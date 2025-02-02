import { useUnit } from "effector-react";
import { useMemo } from "react";
import { AppDataStore } from "src/stores";

export const useAppData = () => {
	const mode = useUnit(AppDataStore.$mode);
	const ready = useUnit(AppDataStore.$ready);

	return useMemo(() => ({ mode, ready }), [mode, ready]);
};
