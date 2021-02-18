const express = require("express");
const router = express.Router();
const donateController = require("../constroller/donateController");

router.get("/donateloguser/:id", donateController.donateloguser);
router.get("/donatelogcampaign/:id", donateController.donatelogcampaign);


module.exports = router;