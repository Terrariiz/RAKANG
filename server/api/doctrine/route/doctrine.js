const express = require("express");
const router = express.Router();
const doctrineController = require("../controller/doctrineController");
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

router.post("/adddoctrine", upload.single('image'), doctrineController.addnewdoctrine);
router.get("/ShowListDoctrine", doctrineController.ShowListDoctrine);


module.exports = router;