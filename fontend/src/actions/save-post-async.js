import { request } from '../utils';
import { setPostData } from './set-post-data';

export const savePostAsync = (id, postData) => (dispatch) => {
	const saveRequest = id
		? request(`/api/posts/${id}`, 'PATCH', postData)
		: request(`/api/posts`, 'POST', postData);
	return saveRequest.then((updatedPost) =>
		dispatch(setPostData(updatedPost.res)),
	);
};
