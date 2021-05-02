const express = require("express");
const router = express.Router();
const DashboardController = require("../controller/dashboarddontroller");


router.get("/DoctrineGotFav/", DashboardController.DoctrineGotFav);
router.get("/TotalDonatePerCampaign/", DashboardController.TotalDonatePerCampaign);
router.get("/TotalExchangePerReward/", DashboardController.TotalExchangePerReward);
router.get("/TotalView_Campaign/", DashboardController.TotalView_Campaign);
router.get("/TotalView_Doctrine/", DashboardController.TotalView_Doctrine);
router.get("/TotalView_News/", DashboardController.TotalView_News);

module.exports = router;
