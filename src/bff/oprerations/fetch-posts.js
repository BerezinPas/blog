import { getComments, getPosts } from '../api';
import { createCommentsMap } from '../utils/create-comments-map';

export const fetchPosts = async (searchValue, page, limit) => {
	const [{ posts, links }, comments] = await Promise.all([
		getPosts(searchValue, page, limit),
		getComments(),
	]);
	const commentsMap = createCommentsMap(comments);

	console.log('links', links);
	console.log('posts', posts);

	return {
		error: null,
		res: {
			posts: posts.map((post) => ({
				...post,
				commentsCount: commentsMap[post.id] || 0,
			})),
			links,
		},
	};
};
