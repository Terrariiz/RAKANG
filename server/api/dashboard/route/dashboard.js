const express = require("express");
const router = express.Router();
const DashboardController = require("../controller/dashboardcontroller");


router.get("/TotalDonatePerUser/", DashboardController.TotalDonatePerUser);
router.get("/TotalDonatePerCampaign/", DashboardController.TotalDonatePerCampaign);
router.get("/DonatePerDay/", DashboardController.DonatePerDay);
router.get("/DoctrineperType/", DashboardController.DoctrineperType);
router.get("/NewsPerType/", DashboardController.NewsPerType);
router.get("/CampaignPerType/", DashboardController.CampaignPerType);
router.get("/ExchangePerDay/", DashboardController.ExchangePerDay);

router.get("/Getdata_Campaign/", DashboardController.Getdata_Campaign);
router.get("/Getdata_Doctrine", DashboardController.Getdata_Doctrine);
router.get("/Getdata_News/", DashboardController.Getdata_News);

module.exports = router;
