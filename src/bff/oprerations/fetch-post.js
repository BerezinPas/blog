import { getUsers } from '../api';
import { getComments } from '../api/get-comments';
import { getPost } from '../api/get-post';
import { addAuthorForComments } from '../utils';

export const fetchPost = async (postId) => {
	try {
		const [post, comments, users] = await Promise.all([
			getPost(postId),
			getComments(postId),
			getUsers(),
		]);

		return {
			error: null,
			res: { ...post, comments: addAuthorForComments(comments, users) },
		};
	} catch (error) {
		return {
			error: error,
			res: null,
		};
	}
};
