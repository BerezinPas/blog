import { URL } from '../../constants';
import { transformComment } from '../transformers';

const fetchURL = `${URL}/comments`;

export const createComment = (authorId, postId, content, publishedAt) => {
	return fetch(fetchURL, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json;charset=utf-8' },
		body: JSON.stringify({
			author_id: authorId,
			post_id: postId,
			content,
			published_at: new Date().toISOString().substring(0, 16).replace('T', ' '),
		}),
	})
		.then((comment) => comment.json())
		.then((comment) => comment && transformComment(comment));
};
