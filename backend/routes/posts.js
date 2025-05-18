const express = require("express");
const {
  getPosts,
  getPost,
  addPost,
  updatePost,
  deletePost,
} = require("../controllers/post");
const { addComment, deleteComment } = require("../controllers/comment");
const { authenticated } = require("../middlewares/authenticated");
const { hasRole } = require("../middlewares/hasRole");
const mapPost = require("../helpers/mapPost");
const mapComment = require("../helpers/mapComment");
const ROLES = require("../constants/role");

const router = express.Router({ mergeParams: true });

router.get("/", async (req, res) => {
  const { posts, lasPage } = await getPosts(
    req.query.search,
    req.query.limit,
    req.query.page
  );

  res.send({ res: { posts: posts.map(mapPost), lasPage }, error: null });
});

router.get("/:id", async (req, res) => {
  const post = await getPost(req.params.id);

  res.send({ res: mapPost(post), error: null });
});

router.post("/:id/comments", authenticated, async (req, res) => {
  const newComment = await addComment(req.params.id, {
    content: req.body.content,
    author: req.user.id,
  });

  res.send({ res: mapComment(newComment), error: null });
});

router.delete(
  "/:postId/comments/:commentId",
  authenticated,
  hasRole([ROLES.ADMIN, ROLES.MODERATOR]),
  async (req, res) => {
    await deleteComment(req.params.postId, req.params.commentId);

    res.send({ res: true, error: null });
  }
);

router.post("/", authenticated, hasRole([ROLES.ADMIN]), async (req, res) => {
  const newPost = await addPost({
    title: req.body.title,
    content: req.body.content,
    image: req.body.imageURL,
  });

  res.send({ res: mapPost(newPost), error: null });
});

router.patch(
  "/:id",
  authenticated,
  hasRole([ROLES.ADMIN]),
  async (req, res) => {
    const updatedPost = await updatePost(req.params.id, {
      title: req.body.title,
      content: req.body.content,
      image: req.body.imageURL,
    });

    res.send({ res: mapPost(updatedPost), error: null });
  }
);

router.delete(
  "/:id",
  authenticated,
  hasRole([ROLES.ADMIN]),
  async (req, res) => {
    await deletePost(req.params.id);

    res.send({ res: true, error: null });
  }
);

module.exports = router;
