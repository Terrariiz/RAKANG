const express = require("express");
const router = express.Router();
const coinController = require("../constroller/coinlogController");

router.get("/coinloglist/:id", coinController.coinloglist);



module.exports = router;