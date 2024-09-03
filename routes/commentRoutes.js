const express = require('express');
const router = express.Router();
const CommentController = require('../controllers/commentController');

router.post('/', CommentController.addComment);
router.get('/user/:userId', CommentController.getCommentsByUser);
router.get('/post/:postId', CommentController.getCommentsByPost);
router.put('/:id', CommentController.updateComment);
router.delete('/:id', CommentController.deleteComment);

module.exports = router;
