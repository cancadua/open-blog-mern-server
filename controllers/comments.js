const Comment = require ('../models').comment;


exports.getComments = (req, res) => {
    Comment.find({ post_id: req.params.postId })
        .then(data => res.send(data))
}

exports.postComment = (req, res) => {
    const comment = new Comment({
        post_id: req.params.postId,
        title: req.body.title,
        content: req.body.content
    })

    comment.save(comment)
        .then(data => res.send(data))
};

exports.putComment = (req, res) => {
    const id = req.params.commentId;

    Comment.findByIdAndUpdate(id, {
        title: req.body.title,
        content: req.body.content,
        time: new Date()
    })
        .then(data => res.send(data))
};

exports.deletePostComments = (postId) => {
    Comment.deleteMany({ post_id: postId })
        .then(data => data.deletedCount)
}

exports.deleteComment = (req, res) => {
    const id = req.params.commentId;

    Comment.findOneAndRemove({_id: id})
        .then(data => res.send(data))
}