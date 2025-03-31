import { URL } from '../../constants';
import { transformPost } from '../transformers';

export const getPost = async (id) => {
	return fetch(`${URL}/posts/${id}`)
		.then((res) => {
			if (res.ok) {
				return res;
			}
			const error =
				res.status === 404 ? 'Статья не найдена' : 'Что-то пошло не так';

			return Promise.reject(error);
		})
		.then((loadedPost) => loadedPost.json())
		.then((post) => post && transformPost(post));
};
