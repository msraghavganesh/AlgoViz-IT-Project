const middleware = {};

middleware.isLoggedIn = function(req, res, next) {
    if(req.isAuthenticated()) {
        return next();
    }
    res.redirect("/auth/login");
};

module.exports = middleware;