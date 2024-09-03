const Post = require('../models/Post');
const User = require('../models/User');
const multer = require('multer');
const path = require('path');

// Set up multer for image uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Folder to store uploaded images
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Filename with current timestamp
  }
});

const upload = multer({ storage: storage });

exports.createPost = async (req, res) => {
    try {
        const { title, body, userId } = req.body;
        const image = req.file ? req.file.filename : null; // Get the uploaded image filename

        const newPost = new Post({
            title,
            body,
            image,
            user: userId,
        });

        await newPost.save();
        res.status(201).json(newPost);
    } catch (err) {
        console.error('Error creating post:', err);
        res.status(500).json({ message: 'Failed to create post', error: err.message });
    }
};

// Get All Posts
exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate('user', 'username');
    res.json(posts);
  } catch (error) {
    console.error('Error fetching posts:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get a Single Post by ID
exports.getPostById = async (req, res) => {
  try {
    const postId = req.params.id;
    const post = await Post.findById(postId).populate('user', 'username').populate('comments');
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.json(post);
  } catch (error) {
    console.error('Error fetching post:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Update a Post with Image Upload
exports.updatePost = [
  upload.single('image'), // Middleware to handle the image upload
  async (req, res) => {
    try {
      const postId = req.params.id;
      const { title, body } = req.body;

      // Validate input
      if (!title || !body) {
        return res.status(400).json({ message: 'Title and body are required' });
      }

      const updatedData = {
        title,
        body
      };

      if (req.file) {
        updatedData.image = req.file.path; // Update image if a new one is uploaded
      }

      const post = await Post.findByIdAndUpdate(postId, updatedData, { new: true });

      if (!post) {
        return res.status(404).json({ message: 'Post not found' });
      }

      res.json(post);
    } catch (error) {
      console.error('Error updating post:', error);
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  }
];

// Delete a Post
exports.deletePost = async (req, res) => {
  try {
    const postId = req.params.id;
    const post = await Post.findByIdAndDelete(postId);

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    res.status(200).json({ message: 'Post deleted successfully' });
  } catch (error) {
    console.error('Error deleting post:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};


exports.toggleLike = async (req, res) => {
    try {
      const postId = req.params.id;
      const post = await Post.findById(postId);
  
      if (!post) {
        return res.status(404).json({ message: 'Post not found' });
      }
  
      post.likes = post.likes ? post.likes + 1 : 1; // Add or toggle like
      await post.save();
  
      res.status(200).json({ message: 'Like toggled', likes: post.likes });
    } catch (error) {
      console.error('Error toggling like:', error);
      res.status(500).json({ message: 'Failed to toggle like' });
    }
  };
  
  
