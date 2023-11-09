const Post = require("../models/post");
const asyncHandler = require("express-async-handler");

exports.index = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: Site Home Page");
});
// Display list of all posts.
exports.post_list = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: Post list");
});

// Display detail page for a specific post.
exports.post_detail = asyncHandler(async (req, res, next) => {
    res.send(`NOT IMPLEMENTED: Post detail: ${req.params.id}`);
});

// Display post create form on GET.
exports.post_create_get = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: Post create GET");
});

// Handle post create on POST.
exports.post_create_post = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: Post create POST");
});