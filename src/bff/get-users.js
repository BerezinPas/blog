import { URL } from '../constants';

const fetchURL = `${URL}/users`;

export const getUsers = fetch(fetchURL).then((loadedUsers) =>
	loadedUsers.json(),
);
