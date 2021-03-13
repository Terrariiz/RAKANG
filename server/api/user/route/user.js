const express = require("express");
const router = express.Router();
const userController = require("../controller/userController");
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, './public/image/profile');
    },
    filename: function(req, file, cb) {
      cb(null, Date.now()+".jpg");
    }
  });

const upload = multer({storage: storage }); 

router.get("/RankList", userController.getUserRank);
router.get("/UserRank/:id", userController.getMyRank);
router.post("/register", userController.registerNewUser);
router.post("/login", userController.loginUser);
router.get("/:id", userController.getUserDetails);
router.post("/:id/reset-password",userController.changePassword);
router.put("/:id/editProfile", upload.single('image'), userController.editProfile);
router.get("/forgotpassword", userController.sentEmail);
router.post('/resetPassword', userController.resetPassword);



module.exports = router;