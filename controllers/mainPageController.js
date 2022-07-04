const express = require("express");
const User = require("../models/user");
const Story = require("../models/story");

/* Display the main page */
exports.main_page_get = function (req, res, next) {
  // Get all stories from the db
  Story.find()
    .populate("author")
    .exec((err, stories) => {
      // check db/query errors
      if (err) return next(err);

      // Stories found, render them in the main page
      res.render("index", { user: req.user, stories: stories });
    });
};
