import { URL } from '../../constants';

export const fetchDeleteComment = (commentId) => {
	const fetchURL = `${URL}/comments`;

	fetch(`${fetchURL}/${commentId}`, {
		method: 'DELETE',
	});
};
