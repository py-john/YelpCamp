var bodyParser     = require("body-parser"),
    express        = require("express"),
    mongoose       = require("mongoose"),
    flash          = require("connect-flash"),
    passport       = require("passport"),
    LocalStrategy  = require("passport-local"),


    methodOverride = require("method-override"),
    Campground     = require("./models/campground"),
    Comment        = require("./models/comment"),
    User           = require("./models/user");

// Route vars
var campgroundRoutes = require("./routes/campgrounds"),
    commentRoutes    = require("./routes/comments"),
    indexRoutes      = require("./routes/index");

// App config
var app = express();
var port = process.env.PORT || 3000
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());

// Mongo
var url = process.env.DATABASEURL || "mongodb://localhost:27017/yelp_camp";
mongoose.connect(url, { useNewUrlParser: true });

// Passport configuration
app.use(require("express-session")({
    secret: process.env.SESSION_SECRET || "session secret string",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Use local flash vars
app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});

// Use routes
app.use("/", indexRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);

// Listen
app.listen(port, function(){
    console.log("App is running at http://localhost:" + port);
});
