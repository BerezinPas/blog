export const transformComment = (dbComment) => ({
	authorId: dbComment.author_id,
	postId: dbComment.post_id,
	content: dbComment.content,
	publishedAt: dbComment.published_at,
	id: dbComment.id,
});
