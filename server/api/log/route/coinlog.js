const express = require("express");
const router = express.Router();
const coinController = require("../controller/userController");

router.get("/coinlog", coinController.coinlog);


module.exports = router;