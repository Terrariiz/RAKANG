const express = require("express");
const router = express.Router();
const donateController = require("../constroller/donateController");

router.get("/donateloglist/:id", donateController.donateloglist);


module.exports = router;