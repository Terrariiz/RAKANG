const express = require("express");
const router = express.Router();
const newsController = require("../controller/newsController");
const mongoose = require("mongoose");
const multer = require('multer');


const storage = multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, './public/image/new');
    },
    filename: function(req, file, cb) {
      cb(null, Date.now()+".jpg");
    }
}); 
const upload = multer({storage: storage });


router.post("/addNews", upload.single('image'), newsController.addnews);
router.get("/ShowListNews", newsController.ShowListNews);
router.get("/DetailNews/:id", newsController.DetailNews);
router.put("/DetailNews/:id/edit",upload.single('image'), newsController.EditNews);
router.delete("/DeleteNews/:id", newsController.DeleteNews);







  

module.exports = router;