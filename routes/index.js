var express = require('express');
var router = express.Router();
const Post = require("../models/post_model");

/* GET home page. */
router.get('/', async(req, res, next) => {
  const allPosts = await Promise.resolve(Post.find({}).sort([['creationDate', -1]])
      .exec());
  res.render('index', { title: 'Welcome!', posts: allPosts });
});


module.exports = router;
