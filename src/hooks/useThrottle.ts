import { useRef } from 'react';

export const useThrottle = () => {
	const lastCall = useRef(0);

	return (delay: number, cb: () => void) => {
		const now = Date.now();
		if (now - lastCall.current >= delay) {
			lastCall.current = now;
			cb();
		}
	};
};
