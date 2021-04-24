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
router.post("/forgotpassword", userController.sentEmail);
router.get("/resetPassword/:token", userController.checkToken);
router.post("/resetPassword/:token", userController.resetPassword);
router.get("/:id", userController.getUserDetails);
router.post("/:id/reset-password",userController.changePassword);
router.put("/:id/editProfile", upload.single('image'), userController.editProfile);
router.get("/:id/CheckFav/:doctrine", userController.CheckFav);
// router.get("/:id/ShowFavDoctrine", userController.ShowFavDoctrine);
router.post("/:id/AddFavouriteDoctrine/:doctrine", userController.AddFavouriteDoctrine);
router.post("/:id/RemoveFavouriteDoctrine/:doctrine", userController.RemoveFavouriteDoctrine);
//router.post("/random/:id", userController.seamsi);
router.post("/lantern/:id", userController.lantern);




module.exports = router;