const express = require('express');
const post_controller = require('../controllers/post_controller')
const router = express.Router();

/* GET posts listing. */
router.get('/', post_controller.post_list);
router.get('/post/:id', post_controller.post_detail);
router.get('/create', post_controller.post_create_get);
router.post('/create', post_controller.post_create_post);

module.exports = router;