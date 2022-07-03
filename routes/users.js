var express = require("express");
var router = express.Router();
const userController = require("../controllers/userController");

router.get("/signup", userController.user_create_get);

router.post("/signup", userController.user_create_post);

router.get("/account", userController.user_detail_get);

router.get("/login", userController.user_login_get);

router.post("/login", userController.user_login_post);

router.post("/logout", userController.user_logout_get);

module.exports = router;
