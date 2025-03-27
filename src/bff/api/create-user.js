import { ROLE, URL } from '../../constants';

const fetchURL = `${URL}/users`;

export const createUser = (login, password) => {
	return fetch(fetchURL, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json;charset=utf-8' },
		body: JSON.stringify({
			login,
			password,
			registed_at: new Date().toISOString().substring(0, 16).replace('T', ' '),
			role_id: ROLE.READER,
		}),
	}).then((user) => user.json());
};
