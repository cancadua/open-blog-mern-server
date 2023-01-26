module.exports = mongoose => mongoose.model(
    'comment',
    mongoose.Schema (
        {
            title: {type: String, required: true},
            content: {type: String, required: true},
            post_id: {type: String},
            updated_on: {type: Date, default: Date.now()},
        })
);