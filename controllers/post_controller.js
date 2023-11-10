const Post = require("../models/post_model");
const asyncHandler = require("express-async-handler");

exports.index = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: Site Home Page");
});

// Display list of all posts.
exports.post_list = asyncHandler(async (req, res, next) => {
    const allPosts = await Promise.resolve(Post.find({})
        .exec());
    console.log("Found: ", allPosts);
    res.render("posts", { book_list: allPosts, title: "All posts"});

});

// Display detail page for a specific post.
exports.post_detail = asyncHandler(async (req, res, next) => {
    const postDetail = await Promise.resolve(Post.findById(req.params.id).exec());
    if (postDetail === null) {
        const err = new Error("Post not found");
        err.status = 404;
        return next(err);
    }
    res.render("post_detail", {title: postDetail.title, body: postDetail.body})
});

// Display post create form on GET.
exports.post_create_get = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: Post create GET");
});

// Handle post create on POST.
exports.post_create_post = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: Post create POST");
});