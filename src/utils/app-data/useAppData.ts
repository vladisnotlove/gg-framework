import { useUnit } from "effector-react";
import { useMemo } from "react";
import { AppDataStore } from "src/stores";

export const useAppData = () => {
	const data = useUnit(AppDataStore.$data);
	const ready = useUnit(AppDataStore.$ready);

	return useMemo(() => ({ ...data, ready }), [data, ready]);
};
