import { getComments, getPosts } from '../api';
import { createCommentsMap } from '../utils/create-comments-map';

export const fetchPosts = async () => {
	const [posts, comments] = await Promise.all([getPosts(), getComments()]);
	const commentsMap = createCommentsMap(comments);

	return {
		error: null,
		res: posts.map((post) => ({
			...post,
			commentsCount: commentsMap[post.id] || 0,
		})),
	};
};
