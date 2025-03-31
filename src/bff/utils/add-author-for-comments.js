export const addAuthorForComments = (comments, users) =>
	comments.map((comment) => {
		const author = users.find(({ id }) => id === comment.authorId)?.login;

		return {
			...comment,
			author,
		};
	});
