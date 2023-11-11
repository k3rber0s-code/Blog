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

/* GET post detail */
router.get('/post/:id', post_controller.post_detail);



/* GET post create form */
router.get('/create', secured, post_controller.post_create_get);
/* POST form data */
router.post('/create', post_controller.post_create_post);

/* GET delete post */
router.get('/post/:id/delete', secured, post_controller.post_delete_get);
/* POST delete post */
router.post('/post/:id/delete', post_controller.post_delete_post);

/* GET update post */
router.get('/post/:id/update', secured, post_controller.post_update_get);
/* POST update post */
router.post('/post/:id/update', post_controller.post_update_post);

module.exports = router;