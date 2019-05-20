var express = require("express");

var app = express();

app.set("port", process.env.PORT || 3000);

app.get("/", (req, res) => {
  res.type("text/plane");
  res.send("Welcome to the travel website");
});

app.get("/about", (req, res) => {
  res.type("text/plane");
  res.send("This is about page");
});

//404 page
app.use(function(req, res) {
  res.type("text/plane");
  res.status(404);
  res.send("404- page not found");
});

// 500 page
app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.type("text/plane");
  res.status(500);
  res.send("500 error");
});

app.listen(app.get("port"), function() {
  console.log("express started " + app.get("port"));
});
