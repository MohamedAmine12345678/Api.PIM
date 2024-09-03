// controllers/userController.js
const User = require('../models/User');
const Post = require('../models/Post');

exports.getUserPosts = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId).populate('posts').populate('comments').populate('likes');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ posts: user.posts, comments: user.comments, likes: user.likes });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};
