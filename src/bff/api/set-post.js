import { URL } from '../../constants';
import { transformPost } from '../transformers';

export const setPost = ({ id, title, content, imageURL }) => {
	const fetchURL = `${URL}/posts`;
	console.log('setPost11', id);

	return fetch(`${fetchURL}/${id}`, {
		method: 'PATCH',
		headers: { 'Content-Type': 'application/json;charset=utf-8' },
		body: JSON.stringify({
			title,
			image_url: imageURL,
			content,
		}),
	})
		.then((post) => post.json())
		.then((post) => post && transformPost(post));
};
