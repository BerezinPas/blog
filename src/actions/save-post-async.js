import { setPostData } from './set-post-data';

export const savePostAsync = (requestServer, postData) => (dispatch) => {
	return requestServer('updatePost', postData).then((updatedPost) =>
		dispatch(setPostData(updatedPost.res)),
	);
};
