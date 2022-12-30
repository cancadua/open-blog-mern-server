module.exports = mongoose => mongoose.model(
    'post',
    mongoose.Schema (
        {
            title: {type: String},
            content: {type: String},
            updated_on: {type: Date, default: Date.now},
        })
);