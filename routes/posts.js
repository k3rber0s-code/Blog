const express = require('express');
const { requiresAuth } = require('express-openid-connect');
const post_controller = require('../controllers/post_controller')
const router = express.Router();

/* GET posts listing. */
router.get('/', post_controller.post_list);
/* GET post detail */
router.get('/post/:id', post_controller.post_detail);
/* GET post create form */
router.get('/create', post_controller.post_create_get);
/* POST form data */
router.post('/create', post_controller.post_create_post);

module.exports = router;