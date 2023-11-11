var express = require('express');
var router = express.Router();
const Post = require("../models/post_model");

/* GET home page. */
router.get('/', async(req, res, next) => {
  const
    numPosts
  = await Promise.resolve(
    Post.countDocuments({}).exec()
  );
  res.render('index', { title: 'Ema Tomanova', post_count: numPosts });
});


module.exports = router;
