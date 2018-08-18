var express = require("express");
var app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");


app.get("/", function(req, res){
    res.render("landing");
});


var campgrounds = [
    {name: "Salmon Creek", image: "https://photosforclass.com/download/flickr-28587945735"}, 
    {name: "Granite Hill", image: "https://photosforclass.com/download/flickr-1430198323"},
    {name: "Mountain Goat's Rest", image: "https://photosforclass.com/download/flickr-3820664827"}
]

app.get("/campgrounds", function(req, res){
    res.render("campgrounds", {campgrounds: campgrounds});
});


app.post("/campgrounds", function(req, res){
    var name = req.body.name;
    var image = req.body.image;
    var newCampground = {name: name, image: image}
    campgrounds.push(newCampground);
    res.redirect("/campgrounds");
});

app.get("/campgrounds/new", function(req, res){
    res.render("new.ejs");
});

app.listen(3000, function(){
    console.log("Serving on port 3000");
});

