const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

// Comment collection schema
const CommentSchema = new mongoose.Schema({
  comment: {
    type: String,
    trim: true,
    required: 'Comment cannot be Empty!',
  },
  author: {
    id: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
    },
    username: String,
  },
  post: {
    id: {
      type: mongoose.Schema.ObjectId,
      ref: 'Post',
    }
  },
  created: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Comment = mongoose.model('comments', CommentSchema);