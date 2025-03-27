import { URL } from '../../constants';
import { transformUser } from '../transformers';

const fetchURL = `${URL}/users`;

export const getUsers = () =>
	fetch(fetchURL)
		.then((loadedUsers) => loadedUsers.json())
		.then((loadedUsers) => loadedUsers && loadedUsers.map(transformUser));
