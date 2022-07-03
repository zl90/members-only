var express = require("express");
var router = express.Router();
const mainPageController = require("../controllers/mainPageController");

/* GET home page. */
router.get("/", mainPageController.main_page_get);

module.exports = router;
