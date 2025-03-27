import { URL } from '../../constants';

export const setUserRole = (userId, roleId) => {
	const fetchURL = `${URL}/users`;
	console.log(`${fetchURL}/${userId}`);
	console.log(userId);

	return fetch(`${fetchURL}/${userId}`, {
		method: 'PATCH',
		headers: { 'Content-Type': 'application/json;charset=utf-8' },
		body: JSON.stringify({
			role_id: roleId,
		}),
	}).then((user) => user.json());
};
