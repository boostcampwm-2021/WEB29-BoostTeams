export const throttle = (fn: any, wait = 1000) => {
	let isCalled = false;
	return (...args: any[]) => {
		if (!isCalled) {
			fn(...args);
			isCalled = true;
			setTimeout(() => {
				isCalled = false;
			}, wait);
		}
	};
};
