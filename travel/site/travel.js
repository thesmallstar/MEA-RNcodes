var express = require("express");
var app = express();
var fortune = require("./lib/fortune.js");

//handle bars
var handlebars = require("express3-handlebars").create({
  defaultLayout: "main"
});
app.engine("handlebars", handlebars.engine);
app.set("view engine", "handlebars");

//setup ports
app.set("port", process.env.PORT || 3000);

//setup public dir
app.use(express.static(__dirname + "/public"));

app.use(function(req, res, next) {
  res.locals.showTests =
    app.get("env") !== "production" && req.query.test === "1";
  next();
});

//home route
app.get("/", (req, res) => {
  res.render("home");
});

//about route with testing
app.get("/about", (req, res) => {
  res.render("about", {
    fortunes: fortune.getfortune(),
    pageTestScript: "/qa/tests-about.js"
  });
});

app.get("/tours/hood-river", function(req, res) {
  res.render("tours/hood-river");
});
app.get("/tours/request-group-rate", function(req, res) {
  res.render("tours/request-group-rate");
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
