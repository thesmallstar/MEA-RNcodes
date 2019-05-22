var express = require("express");
var app = express();
var fortune = require("./lib/fortune.js");

var handlebars = require("express3-handlebars").create({
  defaultLayout: "main"
});

app.engine("handlebars", handlebars.engine);
app.set("view engine", "handlebars");

app.set("port", process.env.PORT || 3000);

app.use(express.static(__dirname + "/public"));

app.get("/", (req, res) => {
  res.render("home");
});

app.get("/about", (req, res) => {
  res.render("about", { fortunes: fortune.getfortune() });
});

//404 page
app.use(function(req, res) {
  res.status(404);
  res.render("404");
});

// 500 page
app.use(function(err, req, res, next) {
  console.error(err.stack);

  res.status(500);
  res.render("500");
});

app.listen(app.get("port"), function() {
  console.log("express started " + app.get("port"));
});
