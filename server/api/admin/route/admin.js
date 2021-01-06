const express = require("express");
const router = express.Router();
//const adminController = require("../controller/userController");
const mongoose = require("mongoose");
const multer = require('multer');


const storage = multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, './uploads/');
    },
    filename: function(req, file, cb) {
      cb(null, file.originalname);
    }
}); 
const upload = multer({storage: storage });
const News = require("../model/News");

router.post("/upload", upload.single('image'), (req, res, next) => {
    const add = new News({
      head: req.body.head,
      detail: req.body.detail,
      image: req.file.path
    });
    add
      .save()
      .then(result => {
        console.log(result);
        res.status(201).json({
          message: "Created product successfully",
        //   createdProduct: {
        //       name: result.name,
        //       price: result.price,
            //   _id: result._id,
            //   request: {
            //       type: 'GET',
            //       url: "http://localhost:4000/products/" + result._id
            //   }
        //   }
        });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
  });



module.exports = router;