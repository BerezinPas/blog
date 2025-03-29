import { URL } from '../../constants';
import { transformUser } from '../transformers';

export const getUserById = (id) =>
	fetch(`${URL}/users/${id}`)
		.then((loadedUser) => loadedUser.json())
		.then((user) => user && transformUser(user));
