import { ROLE } from '../../constants';
import { fetchDeletePost } from '../api';
import { getComments } from '../api/get-comments';
import { sessions } from '../sessions';
import { deleteComment } from './delete-comment';

export const deletePost = async (hash, postId) => {
	const accessRoles = [ROLE.ADMIN];

	const access = await sessions.access(hash, accessRoles);

	if (!access) {
		return {
			error: 'Доступ запрещен',
			res: null,
		};
	}

	fetchDeletePost(postId);

	const comments = await getComments(postId);

	await Promise.all(
		comments.map(({ id: commentId }) => deleteComment(hash, commentId)),
	);

	return {
		error: null,
		res: true,
	};
};
