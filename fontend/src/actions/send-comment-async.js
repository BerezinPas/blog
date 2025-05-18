import { request } from '../utils';
import { addComment } from './add-comment';

export const sendCommentAsync = (postId, content) => (dispatch) => {
	// TODO
	return request(`/api/posts/${postId}/comments`, 'POST', content).then(
		(commentData) => {
			dispatch(addComment(commentData.res));
		},
	);
};
