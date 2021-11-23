const { isLoggedIn } = require("../middleware/AuthHelper");

const express = require("express"),
  router = express.Router(),
  forumController = require("../controllers/ForumController"),
  User = require("../models/User");

  // (req, res, next) => res.redirect("/forum/all/all")
// default route
router.get("/forum", isLoggedIn, (req, res, next) => res.redirect("/forum/view/all/all"));
router.get("/forum/view", isLoggedIn, (req, res, next) => res.redirect("/forum/view/all/all"));
// list all posts
router.get("/forum/view/:filter/:value", isLoggedIn, forumController.forumPage);

// search posts
router.post("/forum/view", isLoggedIn, forumController.forumPage);

router.get("/forum/addPost", isLoggedIn, forumController.getAddPostPage);

router.post("/forum/addPost", isLoggedIn , forumController.postAddPost);

router.get("/forum/addComment/:postId", isLoggedIn, forumController.getAddComment);

router.post("/forum/addComment", isLoggedIn , forumController.postAddComment);

module.exports = router;