var express = require("express");
var app = express();
var fortune = require("./lib/fortune.js");
var formidable = require("formidable");
//handle bars
var handlebars = require("express3-handlebars").create({
  defaultLayout: "main",
  helpers: {
    section: function(name, options) {
      if (!this._sections) this._sections = {};
      this._sections[name] = options.fn(this);
      return null;
    }
  }
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

// use body parser
app.use(require("body-parser")());

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

//file upload

app.get("/contest/vacation-photo", function(req, res) {
  var now = new Date();
  res.render("vacation-photo", {
    year: now.getFullYear(),
    month: now.getMonth()
  });
});
app.post("/contest/vacation-photo/:year/:month", function(req, res) {
  var form = new formidable.IncomingForm();
  form.parse(req, function(err, fields, files) {
    if (err) return res.redirect(303, "/error");
    console.log("received fields:");
    console.log(fields);
    console.log("received files:");
    console.log(files);
    res.redirect(303, "/thank-you");
  });
});

//newsletter
app.get("/newsletter", function(req, res) {
  res.render("newsletter", { csrf: "CSRF token goes here" });
});

app.post("/process", function(req, res) {
  if (req.xhr) {
    console.log(req.query);

    // if there were an error, we would send { error: 'error description' }
    res.send({ success: true });
  } else {
    console.log("h1");
    // if there were an error, we would redirect to an error page
    res.redirect(303, "/thank-you");
  }
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
