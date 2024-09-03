// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/:id/posts', userController.getUserPosts);

module.exports = router;
