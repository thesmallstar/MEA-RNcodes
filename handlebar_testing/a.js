var express = require("express");
app = express();

//handle bars
var handlebars = require("express3-handlebars").create({
  defaultLayout: "main"
});
app.engine("handlebars", handlebars.engine);
app.set("view engine", "handlebars");

//add port to listen
app.set("port", process.env.PORT || 3000);

// add public direct
app.use(express.static(__dirname + "/public"));

//MAIN code goes here

app.get("", (req, res) => {
  console.log("here");
  res.render("a", { layout: "new" });
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
