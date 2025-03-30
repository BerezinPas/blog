import { URL } from '../../constants';

const fetchURL = `${URL}/posts`;

export const createPost = ({ title, content, imageURL }) => {
	return fetch(fetchURL, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json;charset=utf-8' },
		body: JSON.stringify({
			title,
			image_url: imageURL,
			content,
			published_at: new Date().toISOString().substring(0, 16).replace('T', ' '),
		}),
	}).then((post) => post.json());
};
