var express = require("express");
var router = express.Router();
const User = require("../models/user");
const mainPageController = require("../controllers/mainPageController");

router.get("/", mainPageController.main_page_get);

module.exports = router;
