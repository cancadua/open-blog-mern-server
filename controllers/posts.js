const {deletePostComments} = require("./comments");
const Post = require ('../models').post;

exports.getAllPosts = (req, res) => {
    Post.find().select('-__v')
        .then(data => res.send(data))
}

exports.getPost = (req, res) => {

    const id = req.params.postId;

    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
        return res.status(400).send("Wrong ID provided!");
    }

    Post.findById(id).select('-__v')
        .then(data => {
            if (data) {
                return res.send(data)
            } else return res.status(404).send("Post with provided ID doesn't exist!")

        })
}

exports.postPost = (req, res) => {
    const post = new Post({
        title: req.body.title,
        content: req.body.content
    });

    post.save(post)
        .then(() => res.status(201).send("Created!"))
};

exports.putPost = (req, res) => {

    const { title, content } = req.body
    const id = req.params.postId;
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
        return res.status(400).send("Wrong ID provided!");
    }

    Post.findOneAndUpdate({_id: id}, {title: title, content: content, updated_on: new Date()}, { returnDocument: 'after' })
        .then(data => {
            if (data) {
                return res.send("Edited!")
            } else return res.status(404).send("Post with provided ID doesn't exist!")

        })
}

exports.deletePost = (req, res) => {
    const id = req.params.postId;

    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
        return res.status(400).send("Wrong ID provided!");
    }

    Post.findOneAndRemove({_id: id})
        .then(data => {
            if (data) {
                return res.send("Deleted!")
            } else return res.status(404).send("Post with provided ID doesn't exist!")
        })
        .then(() => deletePostComments(id))
}