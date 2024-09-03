const Comment = require('../models/Comment');
const Post = require('../models/Post');
const User = require('../models/User');
const mongoose = require('mongoose'); 


exports.addComment = async (req, res) => {
    try {
        const { text, post, user } = req.body;

        console.log("Parsed data - Text:", text, "Post ID:", post, "User ID:", user);

        // Create a new comment
        const newComment = new Comment({
            text,
            post: new mongoose.Types.ObjectId(post), // Ensure ObjectId is instantiated correctly
            user: new mongoose.Types.ObjectId(user), // Ensure ObjectId is instantiated correctly
            createdAt: Date.now(),
        });

        console.log("New Comment to save:", newComment);

        // Save the comment
        await newComment.save();

        console.log("Comment saved successfully");

        // Send the response
        res.status(201).json(newComment);
    } catch (error) {
        console.log("Error adding comment:", error);
        res.status(500).json({ message: 'Failed to add comment', error: error.message });
    }
};

// Fetch Comments by Post
exports.getCommentsByPost = async (req, res) => {
    try {
        const postId = req.params.postId;

        console.log(`Fetching comments for postId: ${postId}`);
        
        if (!mongoose.Types.ObjectId.isValid(postId)) {
            console.error('Invalid postId format');
            return res.status(400).json({ message: 'Invalid postId format' });
        }

        const comments = await Comment.find({ post: postId }).populate('user', 'username'); // Populate user to get username
        console.log(`Comments found: ${comments.length}`);

        res.status(200).json(comments);
    } catch (err) {
        console.error('Error fetching comments:', err);
        res.status(500).json({ message: 'Failed to fetch comments', error: err.message });
    }
};

// Get Comments by User
exports.getCommentsByUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    const comments = await Comment.find({ user: userId }).populate('post', 'title');
    if (!comments.length) {
      return res.status(404).json({ message: 'No comments found for this user' });
    }
    res.json(comments);
  } catch (error) {
    console.error('Error fetching comments:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};


// Update a Comment
exports.updateComment = async (req, res) => {
    try {
        const commentId = req.params.id;
        const { text } = req.body;

        // Log the request data
        console.log('Received request to update comment.');
        console.log(`Comment ID: ${commentId}`);
        console.log(`New Text: ${text}`);

        if (!mongoose.Types.ObjectId.isValid(commentId)) {
            console.error('Invalid commentId format');
            return res.status(400).json({ message: 'Invalid commentId format' });
        }

        // Attempt to update the comment
        const updatedComment = await Comment.findByIdAndUpdate(
            commentId,
            { text, updatedAt: Date.now() },
            { new: true } // return the updated document
        );

        // Check if the comment was found and updated
        if (!updatedComment) {
            console.error('Comment not found for update');
            return res.status(404).json({ message: 'Comment not found' });
        }

        // Log the successful update
        console.log('Comment updated successfully:', updatedComment);

        // Send the updated comment as a response
        res.status(200).json(updatedComment);
    } catch (error) {
        // Log the error details
        console.error('Error occurred while updating comment:', error);
        res.status(500).json({ message: 'Failed to update comment', error: error.message });
    }
};

  
  

// Delete a Comment
exports.deleteComment = async (req, res) => {
  try {
    const commentId = req.params.id;
    const comment = await Comment.findByIdAndDelete(commentId);

    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    // Remove the comment reference from the post
    await Post.updateOne({ _id: comment.post }, { $pull: { comments: commentId } });

    res.status(200).json({ message: 'Comment deleted successfully' });
  } catch (error) {
    console.error('Error deleting comment:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
