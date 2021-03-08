const express = require("express");
const router = express.Router();
const ruletController = require("../controller/ruletController");
const mongoose = require("mongoose");



router.post("/addrulet", ruletController.addrulet);
router.get("/ShowCard", ruletController.ShowCard);
// router.get("/DetailNews/:id", newsController.DetailNews);



module.exports = router;
