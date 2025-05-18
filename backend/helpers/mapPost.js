const { default: mongoose } = require("mongoose");
const mapCommnet = require("./mapComment");

const mapPost = (post) => ({
  id: post.id,
  title: post.title,
  imageURL: post.image,
  content: post.content,
  publishedAt: post.createdAt,
  comments: post.comments.map((comment) =>
    mongoose.isObjectIdOrHexString(comment) ? comment : mapCommnet(comment)
  ),
});

module.exports = mapPost;
