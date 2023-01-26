module.exports = mongoose => mongoose.model(
    'post',
    mongoose.Schema (
        {
            title: {type: String, required: true},
            content: {type: String, required: true},
            updated_on: {type: Date, default: Date.now},
            tags: [{type: String, trim: true}],
        }).index({ "title": "text", "content": "text" })

);