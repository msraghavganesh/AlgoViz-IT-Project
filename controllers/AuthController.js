// importing libraries
const passport = require("passport");

// importing models
const User = require("../models/User");

exports.getLandingPage = (req, res, next) => {
  console.log(req.user)
  res.render("index", {user: req.user});
};

exports.getLoginPage = (req, res, next) => {
  res.render("loginPage", {user: req.user});
};

exports.getLogout = (req, res, next) => {
  req.logout();
  res.redirect("/auth/login");
};

exports.getSignUp = (req, res, next) => {
  res.render("signup",  {user: req.user});  // update the view
};

exports.postSignUp = async (req, res, next) => {
  try {
    const newUser = new User({
      username: req.body.username,
      email: req.body.email
    });

    const user = await User.register(newUser, req.body.password);

    await passport.authenticate("local")(req, res, () => {
      console.log(
        "success",
        "Hello, " + user.username + " Welcome to Algoviz"
      );
      res.redirect("/");
    });
  }
  catch (err) {
    console.error("Error in creating user " + req.body.username);
    return res.render("signup");
  }
};