const express = require("express");
const { body, validationResult } = require("express-validator");
const User = require("../models/user");
const Story = require("../models/story");
const bcrypt = require("bcryptjs");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const format = require("date-fns/format");

/* Display the Create Story form */
exports.story_create_get = function (req, res, next) {
  res.render("create_story", { user: req.user });
};

/* Process the Create Story form request */
exports.story_create_post = [
  // Validate the form values from the POST request
  body("title")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Must enter a Title")
    .blacklist("\\<\\>\\/"),
  body("content")
    .not()
    .isEmpty()
    .withMessage("Must enter a Story")
    .blacklist("\\<\\>\\/"),
  function (req, res, next) {
    // Extract validation errors from the POST request
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      // There are validation errors, re-render the Create Story form
      // with errors displayed.
      res.render("create_story", { errors: errors.array(), user: req.user });
    }

    // There are no validation errors, save the Story to the db.
    // First, create a temp Story object to hold the data:
    const newStory = new Story({
      author: req.user,
      title: req.body.title,
      content: req.body.content,
      created: format(new Date(), "Pp"),
    });

    // Save the temp Story object to the db:
    newStory.save((err) => {
      // check db/query errors
      if (err) return next(err);

      // Successfully saved the Story to the db. Redirect to the main page.
      res.redirect("/");
    });
  },
];

/* Display the Delete Story form */
exports.story_delete_get = function (req, res, next) {
  Story.findById(req.params.storyid)
    .populate("author")
    .exec((err, story) => {
      // check db/query errors
      if (err) return next(err);

      // Check if the story exists
      if (story === null) {
        const error = new Error("Story not found");
        return next(error);
      }

      // Story has been found, render the Delete page
      res.render("delete_story", { user: req.user, story: story });
    });
};

/* Process the Delete Story form request */
exports.story_delete_post = function (req, res, next) {
  // delete the story from the db
  Story.findByIdAndRemove(req.params.storyid).exec((err) => {
    // check db/query errors
    if (err) return next(err);

    // Story has been successfully deleted, redirect to main page
    res.redirect("/");
  });
};
