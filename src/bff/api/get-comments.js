import { URL } from '../../constants';
import { transformComment } from '../transformers';

export const getComments = (postId) => {
	const fetchURL =
		postId === undefined
			? `${URL}/comments`
			: `${URL}/comments?post_id=${postId}`;

	return fetch(fetchURL)
		.then((loadedComments) => loadedComments.json())
		.then((comments) => comments && comments.map(transformComment));
};
