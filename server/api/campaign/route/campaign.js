const express = require("express");
const router = express.Router();
const campaignController = require("../controller/campaignController");
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, './public/uploads');
    },
    filename: function(req, file, cb) {
      cb(null, file.originalname);
    }
  });

  const upload = multer({storage: storage }); 

router.post("/addcampaign", upload.single('image'), campaignController.addnewcampaign);
router.get("/ShowListCampaign", campaignController.ShowListCampaign);
router.get("/DetailCampaign/:id", campaignController.DetailCampaign);
router.put("/DetailCampaign/:id/edit",upload.single('image'), campaignController.EditCampaign);
router.delete("/DeleteCampaign/:id", campaignController.DeleteCampaign);


module.exports = router;