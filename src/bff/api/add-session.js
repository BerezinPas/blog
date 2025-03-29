import { URL } from '../../constants';

const fetchURL = `${URL}/sessions`;

export const addSession = (hash, user) =>
	fetch(fetchURL, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json;charset=utf-8' },
		body: JSON.stringify({
			hash,
			user: {
				id: user.id,
				login: user.login,
				password: user.password,
				registred_at: user.registredAt,
				role_id: user.roleId,
			},
		}),
	});
