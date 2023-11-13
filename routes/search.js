var express = require('express');
var router = express.Router();
const Post = require("../models/post_model");

router.post('/', async(req, res, next) => {
    let searchTerm = req.body.searchTerm;
    const searchNoSpecialChar = searchTerm.replace(/[^a-zA-Z0-9 ]/g, "")

    const data = await Post.find({
        $or: [
            { title: { $regex: new RegExp(searchNoSpecialChar, 'i') }},
            { body: { $regex: new RegExp(searchNoSpecialChar, 'i') }}
        ]
    });

    res.render("search", { posts: data
    });
});

module.exports = router;