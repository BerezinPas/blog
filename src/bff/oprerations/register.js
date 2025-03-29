import { createUser, getUser } from '../api';
import { sessions } from '../sessions';
import { transformUser } from '../transformers';

export const register = async (regLogin, regPassword) => {
	let existedUser = await getUser(regLogin);

	if (existedUser) {
		return {
			error: 'Такой логин уже занят',
			res: null,
		};
	}

	const user = transformUser(await createUser(regLogin, regPassword));

	// console.log('register', user);

	return {
		error: null,
		res: {
			id: user.id,
			login: user.login,
			roleId: user.roleId,
			session: sessions.create(user),
		},
	};
};
