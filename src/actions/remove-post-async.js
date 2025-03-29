import { removeComment } from './remove-comment';

export const removePostAsync = (requestServer, commentId) => (dispatch) => {
	return requestServer('deletePost', commentId);
	// .then(() => {
	// 	dispatch(removeComment(commentId));
	// });
};
