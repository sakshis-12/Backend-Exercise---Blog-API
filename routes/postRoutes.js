
const express = require("express");
const router = express.Router();
const { getPosts, createPost, updatePost, deletePost, getPost, getLatestPosts} = require("../controllers/postController")

router.route("/").get(getPosts);

router.route("/:id").get(getPost)

router.route("/").post(createPost)

router.route("/:id").put(updatePost)

router.route("/:id").delete(deletePost)

router.route("/").get(getLatestPosts)

module.exports = router;
