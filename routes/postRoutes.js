const express = require('express');
const multer = require('multer');
const router = express.Router();
const postController = require('../controllers/postController');

// Set up multer for image uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Ensure this directory exists in your project root
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    },
});

const upload = multer({ storage: storage });

// Routes
router.post('/', upload.single('image'), postController.createPost); // Handle image uploads
router.get('/', postController.getAllPosts);
router.get('/:id', postController.getPostById);
router.put('/:id', postController.updatePost);
router.delete('/:id', postController.deletePost);
router.put('/:id/like', postController.toggleLike);


module.exports = router;
