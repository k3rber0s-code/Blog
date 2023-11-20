const express = require('express');
const post_controller = require('../controllers/post_controller')
const router = express.Router();

/* AUTH middleware */
const secured = (req, res, next) => {
    if (req.user) {
        return next();
    }
    req.session.returnTo = req.originalUrl;
    res.redirect("/login");
};

/* GET posts listing. */
router.get('/', post_controller.post_list);




/* GET post create form */
router.get('/post/create', secured, post_controller.post_create_get);
/* POST form data */
router.post('/post/create', post_controller.post_create_post);

/* GET delete post */
router.get('/post/:id/delete', secured, post_controller.post_delete_get);
/* POST delete post */
router.post('/post/:id/delete', post_controller.post_delete_post);

/* GET update post */
router.get('/post/:id/update', secured, post_controller.post_update_get);
/* POST update post */
router.post('/post/:id/update', post_controller.post_update_post);

/* GET post detail */
router.get('/post/:id', post_controller.post_detail);
module.exports = router;


/* TAGS */

/* GET create new tag form */
router.get('/tag/create', post_controller.tag_create_get);
module.exports = router;

/* POST create new tag form */
router.post('/tag/create', post_controller.tag_create_post);
module.exports = router;

/* GET all posts by tag */
router.get('/tag/:id', post_controller.tag_detail);
module.exports = router;