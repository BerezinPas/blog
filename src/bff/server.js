import { ROLE } from '../constants';
import { createUser } from './create-user';
import { getUser } from './get-user';
import { sessions } from './sessions';

export const server = {
	async logout(session) {
		sessions.remove(session);
	},

	async authorize(authLogin, authPassword) {
		const user = await getUser(authLogin);

		if (!user) {
			return {
				error: 'Пользователь не найден',
				res: null,
			};
		}

		if (authPassword !== user.password) {
			return {
				error: 'Неверный пароль',
				res: null,
			};
		}

		return {
			error: null,
			res: {
				id: user.id,
				login: user.login,
				roleId: user.roleId,
				session: sessions.create(),
			},
		};
	},
	async register(regLogin, regPassword) {
		let user = await getUser(regLogin);

		if (user) {
			return {
				error: 'Такой логин уже занят',
				res: null,
			};
		}

		const id = await createUser(regLogin, regPassword);

		console.log('register', id);

		return {
			error: null,
			res: {
				id: id,
				login: regLogin,
				roleId: ROLE.READER,
				session: sessions.create(),
			},
		};
	},
};
