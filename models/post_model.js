const mongoose = require('mongoose');
const { Schema } = mongoose;

const postSchema = new mongoose.Schema({
    title: String,
    body: String
});

postSchema.virtual("url").get(function () {
    return `posts/post/${this._id}`
})
module.exports = mongoose.model("Post", postSchema, "posts");