const express = require("express");
const router = express.Router();

const posts = require("../controllers/posts.js");
const comments = require("../controllers/comments.js");
const cors = require("cors");

module.exports = app => {
    router.get("/posts", posts.getAllPosts);
    router.get("/posts/:postId", posts.getPost);
    router.post("/posts", posts.postPost);
    router.put("/posts/:postId", posts.putPost);
    router.delete("/posts/:postId", posts.deletePost);

    router.get('/posts/:postId/comments', comments.getComments);
    router.post('/posts/:postId/comments', comments.postComment);
    router.delete('/posts/comments/:commentId', comments.deleteComment);

    app.use('/api', cors(), router);
};