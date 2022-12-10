const {deletePostComments} = require("./comments");
const Post = require ('../models').post;

exports.getAllPosts = (req, res) => {
    Post.find().select('-__v')
        .then(data => res.send(data))
}

exports.getPost = (req, res) => {
    Post.findById(req.params.postId).select('-__v')
        .then(data => res.send(data))
}

exports.postPost = (req, res) => {
    const post = new Post({
        title: req.body.title,
        content: req.body.content
    });

    post.save(post)
        .then(data => res.send(data))
};

exports.putPost = (req, res) => {
    const { title, content } = req.body
    const id = req.params.postId;

    Post.findOneAndUpdate({_id: id}, {title: title, content: content, time: new Date()})
        .then(data => res.send(data))
}

exports.deletePost = (req, res) => {
    const id = req.params.postId;

    Post.findOneAndRemove({_id: id})
        .then(data => res.send(data))
        .then(() => deletePostComments(id))
}