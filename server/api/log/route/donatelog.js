const express = require("express");
const router = express.Router();
const donateController = require("../constroller/donateController");


router.post("/register", donateController.registerNewUser);


module.exports = router;