import { useUnit } from "effector-react";
import { useMemo } from "react";
import { AuthStore } from "src/stores";

export const useAuth = () => {
	const token = useUnit(AuthStore.$token);
	const ready = useUnit(AuthStore.$ready);

	return useMemo(() => ({ token, ready }), [token, ready]);
};
