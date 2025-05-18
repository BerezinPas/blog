export const debounce = (fn, delay) => {
	let timer;
	return (...args) => {
		console.log('DEBOUNCE CALLBACK');

		clearTimeout(timer);
		timer = setTimeout(fn, delay, ...args);
	};
};
