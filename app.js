var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
var express = require("express");
var flash = require("connect-flash");
var mongoose = require("mongoose");
var passport = require("passport");
var path = require("path");
var session = require("express-session");

var setUpPassport = require("./passportSetUp");
var routes = require("./routes");

var app = express();
mongoose.connect("mongodb://localhost:passporttutorial");
setUpPassport();

app.set("port", process.env.PORT || 3000);

app.use('/', express.static('./'));
app.use('/js', express.static('./public/js'));
app.use(express.static('./public/views'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(session({
  secret: "UJU*JIB##E247riwe$rrerg^r{]rtjkew4fgf{;;/?gne.,~`904nd`}}",
  resave: true,
  saveUninitialized: true
}));

app.use(flash());

app.use(passport.initialize());
app.use(passport.session());

app.use(routes);

app.listen(app.get("port"), function() {
  console.log("Server started on port " + app.get("port"));
});