var express  = require("express"),
    router   = express.Router(),
    passport = require("passport"),
    User     = require("../models/user");

// Root route
router.get("/", function(req, res){
    res.render("landing", {page_name: "landing"});
});

// Register form
router.get("/register", function(req, res){
    res.render("register", {page_name: "register"});
});
// Sign up logic
router.post("/register", function(req, res){
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            req.flash("error", err.message);
            return res.redirect("/register");
        }
        passport.authenticate("local")(req, res, function(){
            req.flash("success", "Welcome to YelpCamp " + req.body.username + "!");
            return res.redirect("/campgrounds");
        });
    });
});

// Show login form
router.get("/login", function(req, res){
    res.render("login", {page_name: "login"});
});

// Handle login logic
router.post("/login", function(req, res, next){
    passport.authenticate("local",
        {
            successRedirect: "/campgrounds",
            failureRedirect: "/login",
            failureFlash: true,
            successFlash: "Hello, " + req.body.username + "!"
        })(req, res);
});

// Logout
router.get("/logout", function(req, res){
    req.logout();
    req.flash("error", "Logged out");
    res.redirect("/campgrounds");
});

module.exports = router;
