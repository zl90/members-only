var express = require("express");
var router = express.Router();
const storyController = require("../controllers/storyController");

router.get("/create", storyController.story_create_get);

router.post("/create", storyController.story_create_post);

router.get("/delete/:storyid", storyController.story_delete_get);

router.post("/delete/:storyid", storyController.story_delete_post);

module.exports = router;
