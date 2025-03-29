import { ROLE } from '../../constants';
import { fetchDeleteUser } from '../api';
import { sessions } from '../sessions';

export const deleteUser = async (hash, userId) => {
	const accessRoles = [ROLE.ADMIN];

	const access = await sessions.access(hash, accessRoles);

	if (!access) {
		return {
			error: 'Доступ запрещен',
			res: null,
		};
	}
	fetchDeleteUser(userId);
	return {
		error: null,
		res: true,
	};
};
