export const createCommentsMap = (comments) =>
	comments.reduce((countMap, comment) => {
		if (countMap[comment.postId]) {
			countMap[comment.postId] += 1;
		} else {
			countMap[comment.postId] = 1;
		}
		return countMap;
	});
