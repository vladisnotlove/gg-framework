import { useRef, useState } from "react";
import useInterval from "use-interval";

export const useNiceInterval = (
	callback: ({ round, stop }: { round: number; stop: () => void }) => void,
	delay: number | null | false,
	options?: {
		immediate?: boolean;
	},
) => {
	const [stopped, setStopped] = useState(false);
	const roundRef = useRef(0);
	useInterval(
		() => {
			roundRef.current++;
			callback({
				round: roundRef.current,
				stop: () => setStopped(true),
			});
		},
		stopped ? null : delay,
		options?.immediate,
	);
};
