require("dotenv").config();

const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

const session = require("express-session");
const passport = require("passport");

require("./config/passport-config");

const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// Express session
app.use(
  session({
    secret: "!!!weatherapp-secret123123!!!",
    saveUninitialized: true,
    resave: true,
  })
);

// Passport init
app.use(passport.initialize());
app.use(passport.session());

// Routes
require("./src/router").forEach((route) => {
  app.use(route.path, route.handler);
});

module.exports = app;
