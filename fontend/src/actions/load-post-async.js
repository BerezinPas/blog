import { request } from '../utils';
import { setPostData } from './set-post-data';

export const loadPostAsync = (postId) => (dispatch) => {
	return request(`/api/posts/${postId}`).then((postData) => {
		if (postData.res) {
			dispatch(setPostData(postData.res));
		}
		return postData;
	});
};
