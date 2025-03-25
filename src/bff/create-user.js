const fetchURL = `${URL}/users`;

export const createUser = (login, password) =>
	fetch(fetchURL, {
		method: 'POST',
		headers: {
			'Content-Type': 'aplication/json;charset=utf-8',
		},
		body: JSON.stringify({
			login,
			password,
			registed_at: new Date().toISOString().substring(0, 16).replace('T', ' '),
			role_id: 2,
		}),
	});
