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

app.engine("handlebars", handlebars.engine);
app.set("view engine", "handlebars");

// add body parser

const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// mongoose connect

const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://admin:admin_password@cluster0-vi5m5.mongodb.net/test?retryWrites=true&w=majority",
  { useMongoClient: true }
);

//add port to listen-default 3000
app.set("port", process.env.PORT || 3000);

// add public direct
app.use(express.static(__dirname + "/public"));

//MAIN code goes here

app.get("/", (req, res) => {
  res.render("home");
});

//User Section //

const User = require("./models/user");

app.get("/user/add", (req, res) => {
  res.render("adduser");
});

app.post("/user/add", (req, res) => {
  const user = new User({
    _id: mongoose.Types.ObjectId(),
    name: req.body.name,
    password: req.body.password
  });

  user
    .save()
    .then(result => {
      console.log(result);
    })
    .catch(err => console.log(err));

  res.send("DOne");
});

app.get("/user/:id", (req, res, next) => {
  User.findById(res.params.id)
    .exec()
    .then(doc => {
      console.log(doc);
    })
    .catch(err => console.log(err));

  res.send("hi");
});

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
