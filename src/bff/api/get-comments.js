import { URL } from '../../constants';
import { transformComment } from '../transformers';

export const getComments = (postId) => {
	const fetchURL = `${URL}/comments`;

	return fetch(`${fetchURL}?post_id=${postId}`)
		.then((loadedComments) => loadedComments.json())
		.then((comments) => comments && comments.map(transformComment));
};
