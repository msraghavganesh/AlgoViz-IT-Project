const { isLoggedIn } = require("../middleware/AuthHelper");

const express = require("express"),
  router = express.Router(),
  passport = require("passport"),
  authController = require('../controllers/AuthController'),
  User = require("../models/User");

// index page handler
// router.get('/', authController.getLandingPage);

// login handler
router.get("/", isLoggedIn, authController.getLandingPage);

router.get("/auth/login", authController.getLoginPage);

router.post("/auth/login", passport.authenticate("local", {
  successRedirect: "/", // need to update the right view
  failureRedirect: "/auth/login",
}), (req, res) => {});

// logout handler
router.get("/auth/logout", authController.getLogout);

// sign up handler
router.get("/auth/signup", authController.getSignUp);

router.post("/auth/signup", authController.postSignUp);

module.exports = router;

// function checkAuthenticated(req, res, next) {
//   if (req.isAuthenticated()) {
//     return next();
//   }

//   // if not authenticated
//   req.flash("error_msg", "Please login to view this resource");
//   res.redirect("/users/login");
// }

// module.exports = {
//   router: router,
//   checkAuthenticated: checkAuthenticated
// }