import { addComment } from './add-comment';

export const sendCommentAsync =
	(requestServer, userId, postId, content, data) => (dispatch) => {
		return requestServer('sendComment', userId, postId, content, data).then(
			(commentData) => {
				dispatch(addComment(commentData.res));
			},
		);
	};
