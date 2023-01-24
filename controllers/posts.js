const {deletePostComments} = require("./comments");
const Post = require ('../models').post;

exports.getAllPosts = (req, res) => {
    Post.find().select('-__v')
        .then(data => res.send(data))
}

exports.getPostsByTag = (req, res) => {
    const tag = req.params.tag;
    Post.find({ "tags" : tag }).select('-__v')
        .then(data => res.send(data))
}


exports.getPost = (req, res) => {

    const id = req.params.postId;

    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
        return res.status(400).send({message: "Wrong ID provided!"});
    }

    Post.findById(id).select('-__v')
        .then(data => {
            if (data) {
                return res.send(data)
            } else return res.status(404).send({message: "Post with provided ID doesn't exist!"})

        })
}

exports.postPost = (req, res) => {
    const post = new Post({
        title: req.body.title,
        content: req.body.content,
        tags: req.body.tags
    });
    post.save(post)
        .then(() => res.status(200).send({message: "Created!"}))
        .catch(e => res.status(400).send())
};

exports.putPost = (req, res) => {

    const { title, content, tags } = req.body
    const id = req.params.postId;
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
        return res.status(400).send({message: "Wrong ID provided!"});
    }

    Post.findOneAndUpdate({_id: id}, {title: title, content: content, tags: tags, updated_on: new Date()}, { returnDocument: 'after' })
        .then(data => {
            if (data) {
                return res.send({message: "Edited!"})
            } else return res.status(404).send({message: "Post with provided ID doesn't exist!"})

        })
}

exports.deletePost = (req, res) => {
    const id = req.params.postId;

    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
        return res.status(400).send({message: "Wrong ID provided!"});
    }

    Post.findOneAndRemove({_id: id})
        .then(data => {
            if (data) {
                return res.send({message: "Deleted!"})
            } else return res.status(404).send({message: "Post with provided ID doesn't exist!"})
        })
        .then(() => deletePostComments(id))
}

exports.getAllTags = (req, res) => (
    Post.find().distinct("tags")
        .then(data => res.send(data))
)

exports.searchPosts = (req, res) => {
    Post.find({ $text: { $search: req.params.searchedText } }).select('-__v')
        .then(data => res.send(data))
}


