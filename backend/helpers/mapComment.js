const mapCommnet = (comment) => ({
  content: comment.content,
  author: comment.author.login,
  id: comment._id,
  publishedAt: comment.createdAt,
});

module.exports = mapCommnet;
