import { URL } from '../../constants';
import { transformPost } from '../transformers';

export const getPosts = async (searchValue = '', page = 1, limit = 9) => {
	return fetch(
		`${URL}/posts?title_like=${searchValue}&_page=${page}&_limit=${limit}`,
	)
		.then((loadedPosts) => {
			console.log('loadedPosts', loadedPosts.headers);

			return Promise.all([loadedPosts.json(), loadedPosts.headers.get('link')]);
		})
		.then(([posts, links]) => ({
			posts: posts && posts.map(transformPost),
			links,
		}));
};
