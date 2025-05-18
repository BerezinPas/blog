const Post = require("../models/Post");

// addpost

const addPost = async (post) => {
  const newPost = await Post.create(post);
  await newPost.populate({ path: "comments", populate: "author" });

  return newPost;
};

// edit

const updatePost = async (id, postData) => {
  // TODO ASYNC

  const newPost = await Post.findByIdAndUpdate(id, postData, {
    returnDocument: "after",
  });

  await newPost.populate({ path: "comments", populate: "author" });
  return newPost;
};

// delete

const deletePost = (id) => {
  return Post.deleteOne({ _id: id });
};

//get list with pag and search

const getPosts = async (search = "", limit = 10, page = 1) => {
  const [posts, count] = await Promise.all([
    Post.find({ title: { $regex: search, $options: "i" } })
      .limit(limit)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 }),
    Post.countDocuments({ title: { $regex: search, $options: "i" } }),
  ]);

  return { posts, lasPage: Math.ceil(count / limit) };
};

// get item

const getPost = (id) => {
  return Post.findById(id).populate({ path: "comments", populate: "author" });
};

module.exports = {
  addPost,
  deletePost,
  updatePost,
  getPosts,
  getPost,
};
