import { removeComment } from './remove-comment';

export const removeCommentAsync = (requestServer, commentId) => (dispatch) => {
	return requestServer('deleteComment', commentId).then(() => {
		dispatch(removeComment(commentId));
	});
};
