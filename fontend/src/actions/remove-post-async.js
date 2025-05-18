import { request } from '../utils';
import { removeComment } from './remove-comment';

export const removePostAsync = (id) => (dispatch) => {
	return request(`/api/posts/${id}`, 'DELETE').then(() => {
		dispatch(removeComment(id));
	});
};
