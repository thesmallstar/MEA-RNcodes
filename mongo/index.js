//calling express
var express = require("express");
app = express();

//handle bars with section
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

// adding body parser

app.use(require("body-parser")());

app.engine("handlebars", handlebars.engine);
app.set("view engine", "handlebars");

//add port to listen-default 3000
app.set("port", process.env.PORT || 3000);

// add public direct
app.use(express.static(__dirname + "/public"));

//MAIN code goes here

//Middlewares and errors
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

//Listen port
app.listen(app.get("port"), function() {
  console.log("express started " + app.get("port"));
});
