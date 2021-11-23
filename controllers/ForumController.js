// importing libraries
const Post = require('../models/Post');
const { isEmpty } = require('lodash');
const Comment = require('../models/Comment');

exports.forumPage = async (req, res, next) => {
  try {
    const filter = isEmpty(req.params) ? req.body.filter.toLowerCase() : req.params.filter;
    const value = isEmpty(req.params) ? req.body.searchName : req.params.value;
    let searchObj = {};
    if (filter !== 'all' && value !== 'all') {
      // fetch post based on filters
      searchObj[filter] = value;
    }

    const postCount = await Post.find(searchObj).countDocuments();

    const posts = await Post.find(searchObj);
    console.log(posts);
    res.render("forum", {
      postCount: postCount,
      addPost: true,
      posts: posts,
      filter: filter,
      value: value
    });
  } catch (err) {
    // console.log(err.messge);
    return res.redirect('back');
  }
};

exports.getAddPostPage = (req, res, next) => {
  res.render("forum/addpost", { addPost: false });
};

exports.postAddPost = async(req, res) => {
  try {
    // validate post
    const post = new Post({
      title: req.body.post.title,
      content: req.body.post.content,
      algorithm: req.body.post.algorithm,
      author: {
        id: req.user.id,
        username: req.user.username
      }
    });
    console.log("Added new post: ", post);
    const newPost = await post.save();
    return res.redirect('/forum/view/all/all/');
    // res.send("Added new post: " + newPost);
  } catch (err) {
    console.log(err, "Unable to save post titled: " + req.body.title);
    return res.redirect('back');
  }
};

exports.getAddComment = async(req, res, next) => {
  try {
    const post = await Post.findById(req.params.postId);
    var comments = [];
    for (const comment of post.comments) {
      const fetchedComment = await Comment.findById(comment);
      comments.push(fetchedComment);
    }
    console.log("Fetched comments: ", comments);
    return res.render("forum/addcomment", { addPost: false, post: post, comments: comments });
  } catch (err) {
    console.log(err, "Unable to get post: " + req.body.title);
    return res.redirect('back');
  }

};

exports.postAddComment = async (req, res, next) => {
    try {
      // validate comment
      const comment = new Comment({
        comment: req.body.post.comment,
        author: {
          id: req.user.id,
          username: req.user.username
        },
        post: {
          id: req.body.post.postId,
        }
      });
      console.log("Adding new comment: ", comment);
      await comment.save();

      const post = await Post.findById(comment.post.id);
      post.comments.push(comment.id);
      await post.save();

      res.redirect('back');

    } catch (err) {
      console.log(err, "Unable to add comment : " + req.body.post.comment);
      return res.redirect('back');
    }
};
