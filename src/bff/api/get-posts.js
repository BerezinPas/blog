import { URL } from '../../constants';
import { transformPost } from '../transformers';

export const getPosts = async () => {
	return fetch(`${URL}/posts/`)
		.then((loadedPosts) => loadedPosts.json())
		.then((posts) => posts && posts.map(transformPost));
};
