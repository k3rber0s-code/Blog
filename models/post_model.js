const mongoose = require('mongoose');
const { Schema } = mongoose;

const postSchema = new mongoose.Schema({
    title: String,
    body: String,
    author: String,
    tag: [{type: Schema.Types.ObjectId, ref: "Tag"}],
    creationDate: {type: Date, immutable: true, default: Date.now},
    updatedAt: {type: Date, default: Date.now},
    comments: [{body: String, name: String, date: Date}],
    hidden: Boolean,
    meta: {
        votes: Number,
        favs: Number
    }
},
{ timestamps: true }
);

postSchema.virtual("url").get(function () {
    return `posts/post/${this._id}`
})
module.exports = mongoose.model("Post", postSchema, "posts");