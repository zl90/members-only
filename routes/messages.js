var express = require("express");
var router = express.Router();
const messageController = require("../controllers/messageController");

router.get("/create", messageController.message_create_get);

router.post("/create", function (req, res, next) {
  res.send("Not implemented: Message Create POST");
});

router.get("/delete/:messageid", function (req, res, next) {
  res.send("Not implemented: Message Delete GET");
});

router.post("/delete/:messageid", function (req, res, next) {
  res.send("Not implemented: Message Delete POST");
});

module.exports = router;
