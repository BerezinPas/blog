import { URL } from '../constants';

const fetchURL = `${URL}/users`;

export const createUser = (login, password) => {
	console.log(login);

	return fetch(fetchURL, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json;charset=utf-8' },
		body: JSON.stringify({
			login: login,
			password,
			registed_at: new Date().toISOString().substring(0, 16).replace('T', ' '),
			roleId: 2,
		}),
	}).then((user) => user.json());
};
