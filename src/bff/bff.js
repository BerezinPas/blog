import { ROLE, URL } from '../constants';
import { createSession } from './create-session';
import { createUser } from './create-user';
import { getUser } from './get-user';

export const server = {
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
			res: createSession(user.role_id),
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
			res: createSession(ROLE.READER),
		};
	},
};
