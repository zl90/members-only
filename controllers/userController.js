const express = require("express");
const { body, validationResult } = require("express-validator");
const User = require("../models/user");
const Story = require("../models/story");
const bcrypt = require("bcryptjs");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const story = require("../models/story");

/* Display the Create User form */
exports.user_create_get = function (req, res, next) {
  res.render("signup", { user: req.user });
};

/* Process the Create User form request */
exports.user_create_post = [
  // Validate the form data
  body("username", "Must enter a username")
    .trim()
    .isLength({ min: 4, max: 15 })
    .withMessage("Username must be 4-15 characters long")
    .escape(),
  body("password", "Must enter a password")
    .isLength({ min: 4 })
    .withMessage("Password must be at least 4 characters long")
    .escape(),
  body("confirm-password", "Passwords must match")
    .isLength({ min: 4 })
    .withMessage("Password must be at least 4 characters long")
    .escape()
    .custom((value, { req }) => value === req.body.password),
  (req, res, next) => {
    // Extract the validation errors from the POST request.
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      // There are validation errors, re-render the form with errors
      res.render("signup", { errors: errors.array() });
      return;
    }
    const username = req.body.username;
    const password = req.body.password;

    // Check the username doesn't already exist in the db
    User.find({ username: username }).exec((err, foundUsername) => {
      if (err) {
        return next(err);
      }

      if (foundUsername.length > 0) {
        // User already exists in the db. Report this error and
        // re-render the sign-up form:
        console.log("username exists.");
        res.render("signup", { errors: [{ msg: "Username already exists" }] });
        return;
      }

      // Username doesn't exist in the db already, go ahead and create it:
      bcrypt.hash(password, 10, function (err, hashedPassword) {
        // check for bcrypt errors
        if (err) {
          return next(err);
        }

        // Success, password is hashed. Create new user and save to db
        const user = new User({
          username: username,
          password: hashedPassword,
        });

        user.save((err) => {
          // check db/query errors
          if (err) {
            return next(err);
          }

          // Success, user is saved to the db. Redirect to login page
          res.redirect("/users/login");
        });
      });
    });
  },
];

/* Display the User Detail page */
exports.user_detail_get = function (req, res, next) {
  if (req.user) {
    // If the user is logged in, find all of their stories
    Story.find({ author: req.user })
      .populate("author")
      .exec((err, stories) => {
        if (err) {
          return next(err);
        }

        res.render("account", { user: req.user, stories: stories });
      });
  } else {
    res.render("account");
  }
};

/* Display the login page */
exports.user_login_get = function (req, res, next) {
  res.render("login", { user: req.user });
};

/* Process the User login request */
exports.user_login_post = passport.authenticate("local", {
  successRedirect: "/users/login",
  failureRedirect: "/users/login-failure",
});

exports.user_login_failure_get = function (req, res, next) {
  const errors = [new Error()];
  errors[0].msg = "Incorrect username/password";
  res.render("login_failure", { user: req.user, errors: errors });
};

/* Display the User logout form */
exports.user_logout_post = function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/users/login");
  });
};
