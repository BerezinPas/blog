import { ROLE } from '../../constants';
import { createPost, setPost } from '../api';
import { sessions } from '../sessions';

export const savePost = async (hash, postData) => {
	const accessRoles = [ROLE.ADMIN];

	const access = await sessions.access(hash, accessRoles);

	if (!access) {
		return {
			error: 'Доступ запрещен',
			res: null,
		};
	}

	const post =
		postData.id === null ? await createPost(postData) : await setPost(postData);

	console.log('updatePostupdatePost', post);
	return {
		error: null,
		res: post,
	};
};
