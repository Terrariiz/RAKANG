const express = require("express");
const router = express.Router();
const campaignController = require("../controller/campaignController");
const multer = require('multer');
const bodyParser = require('body-parser');
const path = require('path');
const crypto = require('crypto');


const storage = multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, './public/image/campaign');
    },
    filename: function(req, file, cb) {
      cb(null, Date.now()+".jpg");
    }
  });

  const upload = multer({storage: storage }); 

router.post("/addcampaign", upload.single('image'), campaignController.addnewcampaign);
router.get("/ShowListCampaign", campaignController.ShowListCampaign);
router.get("/DetailCampaign/:id", campaignController.DetailCampaign);
router.put("/DetailCampaign/:id/edit",upload.single('image'), campaignController.EditCampaign);
router.delete("/DeleteCampaign/:id", campaignController.DeleteCampaign);
// router.put('/DonateCampaign/:campaign/:id/:amount', campaignController.DonateCampaign);
// router.get("/files", campaignController.files)
// router.post("/addcampaignimage",upload.array('fileupload',12), campaignController.addcampaignimage);
// router.post("/deletecampaignimage", campaignController.deletecampaignimage);


module.exports = router;