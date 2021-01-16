const express = require("express");
const router = express.Router();
const userController = require("../controller/userController");
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, './public/image/profile');
    },
    filename: function(req, file, cb) {
      cb(null, file.originalname);
    }
  });

const upload = multer({storage: storage }); 

router.post("/register", userController.registerNewUser);
router.post("/login", userController.loginUser);
router.get("/:id",userController.getUserDetails);
router.put("/:id/editProfile", upload.single('image'), userController.editProfile);

module.exports = router;