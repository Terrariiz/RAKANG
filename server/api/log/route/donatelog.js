const express = require("express");
const router = express.Router();
const donateController = require("../constroller/donateController");

router.get("/donateloglist/:id", donateController.donateloglist);
router.get("/donatelogcampaign/:id", donateController.donatelogcampaign);


module.exports = router;