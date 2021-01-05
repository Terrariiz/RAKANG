const express = require("express");
const router = express.Router();
const doctrineController = require("../controller/doctrineController");

router.post("/adddoctrine", doctrineController.addnewdoctrine);

module.exports = router;