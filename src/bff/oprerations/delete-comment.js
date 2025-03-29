import { ROLE } from '../../constants';
import { fetchDeleteComment } from '../api';
import { sessions } from '../sessions';

export const deleteComment = async (hash, commentId) => {
	const accessRoles = [ROLE.ADMIN, ROLE.MODERATOR];

	const access = await sessions.access(hash, accessRoles);

	if (!access) {
		return {
			error: 'Доступ запрещен',
			res: null,
		};
	}

	fetchDeleteComment(commentId);
	return {
		error: null,
		res: true,
	};
};
