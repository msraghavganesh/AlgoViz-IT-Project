const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

// Post collection schema
const PostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      require: 'Please enter a Title for your post',
    },
    content: {
      type: String,
      trim: true,
      required: 'Enter your question/content',
    },
    algorithm: {
      type: String,
      trim: true
    },
    created: {
      type: Date,
      default: Date.now,
    },
    author: {
      id: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
      },
      username: String,
    },
    comments: [{
      type: mongoose.Schema.Types.ObjectId,
      ref : "Comment",
    }]
  }
);

module.exports = Post = mongoose.model('posts', PostSchema);
