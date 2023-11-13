const Post = require("../models/post_model");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const he = require("he");


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
    console.log(postDetail.body)
    const md = require('markdown-it')();
    const html_body = md.render(postDetail.body)
    console.log(html_body)
    res.render("post_detail", {title: postDetail.title, body: html_body, post_url: "/" + postDetail.url})
});

// Display post create form on GET.
exports.post_create_get = asyncHandler(async (req, res, next) => {
    res.render("post_form", {title: "Create post"});
});

// Handle post create on POST.
exports.post_create_post = [
    body("title", "Title must not be empty.")
        .trim()
        .isLength({ min: 1 })
        .escape(),
    body("body", "Body must not be empty.")
        .trim()
        .isLength({ min: 1 })
        .escape(),

    asyncHandler(async (req, res, next) => {
        // Extract the validation errors from a request.
        const errors = validationResult(req);
        console.log("Errors extracted: ", errors)

        // console.log(req.body.body)
        // const TurndownService = require('turndown')
        // const turndownService = new TurndownService()
        // const body_md = turndownService.turndown(req.body.body)

        const he = require('he');
        const body_unescaped = he.unescape(req.body.body);

        // Create a Post object with escaped and trimmed data.
        const post = new Post({
            title: req.body.title,
            body: body_unescaped
        });

        if (!errors.isEmpty()) {
            console.log("There have been errors.")
            // There are errors. Render form again with sanitized values/error messages.
            res.render("post_form", {
                title: "Create post",
                errors: errors.array()
            });
        } else {
            console.log(post)
            console.log("All ok, saving...")
            // Data from form is valid. Save post.
            await post.save();
            res.redirect("/" + post.url)
        }
    }),
];
//

exports.post_delete_get = asyncHandler(async (req, res, next) => {
    const post = await Promise.resolve(
        Post.findById(req.params.id).exec()
    );

    if (post === null) {
        // No results.
        const err = new Error("Post not found");
        err.status = 404;
        return next(err);
    }
    res.render("post_delete", {
        title: "Delete post",
        post: post
    });
});

exports.post_delete_post = asyncHandler(async (req, res, next) => {
    const post = await Promise.resolve(
        Post.findById(req.params.id).exec()
    );
    await Post.findByIdAndDelete({_id: req.body.postid.toString().trim()});
    res.redirect("/posts");
});

exports.post_update_get = asyncHandler(async (req, res, next) => {
    const post = await Promise.resolve(
        Post.findById(req.params.id).exec()
    );

    if (post === null) {
        // No results.
        const err = new Error("Post not found");
        err.status = 404;
        return next(err);
    }


    res.render("post_form", {
        title: "Update Post",
        post: post,
    });
});

exports.post_update_post = [
    // Validate and sanitize fields.
    body("title", "Title must not be empty.")
        .trim()
        .isLength({ min: 1 })
        .escape(),
    body("body", "Body must not be empty.")
        .trim()
        .isLength({ min: 1 })
        .escape(),

    // Process request after validation and sanitization.
    asyncHandler(async (req, res, next) => {
        // Extract the validation errors from a request.
        const errors = validationResult(req);

        const he = require('he');
        const body_unescaped = he.unescape(req.body.body);

        // Create a Post object with escaped/trimmed data and old id.
        const post = new Post({
            title: req.body.title,
            body: body_unescaped,
            _id: req.params.id, // This is required, or a new ID will be assigned!
        });

        if (!errors.isEmpty()) {
            // There are errors. Render form again with sanitized values/error messages.

            res.render("post_form", {
                title: "Update Post",
                post: post,
                errors: errors.array(),
            });
        } else {
            // Data from form is valid. Update the record.
            const updatedPost = await Post.findByIdAndUpdate(req.params.id, post, {});
            console.log(updatedPost)
            // Redirect to book detail page.
            res.redirect("/" + updatedPost.url);
        }
    })
];

