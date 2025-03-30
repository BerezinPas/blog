import { getUsers } from '../api';
import { getComments } from '../api/get-comments';
import { getPost } from '../api/get-post';

export const fetchPost = async (postId) => {
	const [post, comments, users] = await Promise.all([
		getPost(postId),
		getComments(postId),
		getUsers(),
	]);

	const commentsWithAuthor = comments.map((comment) => {
		const author = users.find(({ id }) => id === comment.authorId)?.login;
		return {
			...comment,
			author,
		};
	});
	// console.log('commentsWithAuthor', commentsWithAuthor);

	return {
		error: null,
		res: { ...post, comments: commentsWithAuthor },
	};
};
