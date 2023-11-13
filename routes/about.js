var express = require('express');
var router = express.Router();
const Post = require("../models/post_model");

/* GET home page. */
router.get('/', async(req, res, next) => {
    const allPosts = await Promise.resolve(Post.find({})
        .exec());
    res.render('about');
});


module.exports = router;