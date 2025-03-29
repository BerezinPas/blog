import { URL } from '../../constants';

export const fetchDeletePost = (postId) => {
	const fetchURL = `${URL}/posts`;

	return fetch(`${fetchURL}/${postId}`, {
		method: 'DELETE',
	});
};
