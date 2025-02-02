import { useUnit } from "effector-react";
import { useEffect, useMemo } from "react";
import { AdStore } from "src/stores";

export const useAd = () => {
	const blockId = useUnit(AdStore.$blockId);
	const adController = useUnit(AdStore.$adController);
	const ready = useUnit(AdStore.$ready);

	const show = useMemo(() => {
		if (ready && adController) {
			return adController.show;
		}
		return undefined;
	}, [adController, ready]);

	useEffect(() => {
		if (blockId && !adController) {
			const adController = window.Adsgram?.init({ blockId });
			if (adController) {
				AdStore.setAdController(adController);
			}
		}
	}, [blockId, adController]);

	return useMemo(() => ({ show, ready }), [show, ready]);
};
