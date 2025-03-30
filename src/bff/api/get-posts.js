import { URL } from '../../constants';
import { transformPost } from '../transformers';

export const getPosts = async (page = 1, limit = 9) => {
	return fetch(`${URL}/posts?_page=${page}&_limit=${limit}`)
		.then((loadedPosts) =>
			Promise.all([loadedPosts.json(), loadedPosts.headers.get('link')]),
		)
		.then(([posts, links]) => ({
			posts: posts && posts.map(transformPost),
			links,
		}));
};
