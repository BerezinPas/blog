import { URL } from '../../constants';
import { transformUser } from '../transformers';

export const getUser = async (loginToFind) =>
	fetch(`${URL}/users?login=${loginToFind}`)
		.then((loadedUser) => loadedUser.json())
		.then(([user]) => user && transformUser(user));
