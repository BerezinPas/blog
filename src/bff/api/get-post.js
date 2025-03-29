import { URL } from '../../constants';
import { transformPost } from '../transformers';

export const getPost = async (id) => {
	return fetch(`${URL}/posts/${id}`)
		.then((loadedPost) => loadedPost.json())
		.then((post) => post && transformPost(post));
};
