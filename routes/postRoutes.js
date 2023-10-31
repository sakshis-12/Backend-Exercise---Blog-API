const express = require("express");
const router = express.Router();
const { getPosts, createPost, updatePost, deletePost, getPost, getLatestPosts} = require("../controllers/postController")

router.get("/", (req, res) => {
    res.send("HOME PAGE");
  });

router.route("/api/posts").get(getPosts);

router.route("/api/posts:id").get(getPost)

router.route("/api/posts").post(createPost)

router.route("/api/posts:id").put(updatePost)

router.route("/api/posts:id").delete(deletePost)

router.route("/api/posts/latest").get(getLatestPosts)

module.exports = router;
