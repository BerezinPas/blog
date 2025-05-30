export const request = (url, method, data) => {
	return fetch(url, {
		headers: {
			'content-Type': 'application/json',
		},
		method: method || 'GET',
		body: data ? JSON.stringify(data) : undefined,
	}).then((res) => res.json());
};
