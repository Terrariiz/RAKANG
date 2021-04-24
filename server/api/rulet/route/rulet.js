const express = require("express");
const router = express.Router();
const ruletController = require("../controller/ruletController");
const mongoose = require("mongoose");



router.post("/addrulet", ruletController.addrulet);
router.get("/ShowCard/:id", ruletController.ShowCard);
// router.get("/DetailNews/:id", newsController.DetailNews);
router.post("/test", ruletController.test);
router.post("/random/:id", ruletController.seamsi);


module.exports = router;
