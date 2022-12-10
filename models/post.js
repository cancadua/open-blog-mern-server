module.exports = mongoose => mongoose.model(
    'post',
    mongoose.Schema (
        {
            title: {type: String},
            content: {type: String},
            time: {type: Date, default: Date.now},
        })
);