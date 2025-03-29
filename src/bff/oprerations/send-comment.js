import { ROLE } from '../../constants';
import { createComment, getUserById, getUsers } from '../api';
import { sessions } from '../sessions';
import { transformComment } from '../transformers';

export const sendComment = async (hash, userId, postId, content, data) => {
	const accessRoles = [ROLE.ADMIN, ROLE.MODERATOR, ROLE.READER];

	const access = await sessions.access(hash, accessRoles);

	if (!access) {
		return {
			error: 'Доступ запрещен',
			res: null,
		};
	}

	const comment = transformComment(
		await createComment(userId, postId, content, data),
	);

	const user = await getUserById(userId);

	return {
		error: null,
		res: { ...comment, author: user.login },
	};
};
