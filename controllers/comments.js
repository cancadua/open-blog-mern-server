const Comment = require ('../models').comment;


exports.getComments = (req, res) => {
    Comment.find({ post_id: req.params.postId }).sort({updated_on: 'desc'}).select('-__v')
        .then(data => res.send(data))
}

exports.postComment = (req, res) => {
    const comment = new Comment({
        post_id: req.params.postId,
        title: req.body.title,
        content: req.body.content
    })

    comment.save(comment)
        .then(() => res.status(201).send({message: "Created!"}))
        .catch(e => res.status(400).send(e))
};


exports.deletePostComments = (postId) => {
    Comment.deleteMany({ post_id: postId })
        .then(data => data.deletedCount)
}

exports.deleteComment = (req, res) => {
    const id = req.params.commentId;

    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
        return res.status(400).send({message: "Wrong ID provided!"});
    }

    Comment.findOneAndRemove({_id: id})
        .then(data => {
            if (data) {
                return res.send({message: "Deleted!"})
            } else return res.status(404).send({message: "Comment with provided ID doesn't exist!"})
        })
}