const express = require("express");
const router = express.Router();
const userController = require("../controller/userController");

router.post("/register", userController.registerNewUser);
router.post("/login", userController.loginUser);
router.get("/:id",userController.getUserDetails);
router.post("/:id/editProfile",userController.editProfile);

module.exports = router;