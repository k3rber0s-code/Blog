const mongoose = require('mongoose');
const { Schema } = mongoose;

const tagSchema = new mongoose.Schema({
    name: String
});

tagSchema.virtual("url").get(function () {
    return `/posts/tag/${this._id}`
})
module.exports = mongoose.model("Tag", tagSchema, "tags");