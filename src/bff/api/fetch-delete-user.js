import { URL } from '../../constants';

export const fetchDeleteUser = (userId) => {
	const fetchURL = `${URL}/users`;

	fetch(`${fetchURL}/${userId}`, {
		method: 'DELETE',
	});
};
