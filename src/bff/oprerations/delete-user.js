import { ROLE } from '../../constants';
import { fetchDeleteUser } from '../api';
import { sessions } from '../sessions';

export const deleteUser = async (userSession, userId) => {
	const accessRoles = [ROLE.ADMIN];

	if (!sessions.access(userSession, accessRoles)) {
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
