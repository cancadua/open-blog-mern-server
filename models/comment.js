module.exports = mongoose => mongoose.model(
    'comment',
    mongoose.Schema (
        {
            title: {type: String},
            content: {type: String},
            post_id: {type: String},
            time: {type: Date, default: Date.now},
        })
);