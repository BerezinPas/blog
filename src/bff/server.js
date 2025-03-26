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
		const user = await getUser(regLogin);

		if (user) {
			return {
				error: 'Такой логин уже занят',
				res: null,
			};
		}

		await createUser(regLogin, regPassword);

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
};
