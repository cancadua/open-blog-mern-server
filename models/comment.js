module.exports = mongoose => mongoose.model(
    'comment',
    mongoose.Schema (
        {
            title: {type: String},
            content: {type: String},
            post_id: {type: String},
            updated_on: {type: Date, default: Date.now},
        })
);