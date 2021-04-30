const express = require("express");
const router = express.Router();
const donateController = require("../constroller/donateController");

router.get("/donateloguser/:id", donateController.donateloguser);
router.get("/donatelogcampaign/:id", donateController.donatelogcampaign);
router.get("/CheckDonate/:id", donateController.CheckDonate);

router.get("/donate_log_campaign_for_dashboard", donateController.donate_log_campaign_for_dashboard);


module.exports = router;