const express = require("express");
const router = express.Router();
const doctrineController = require("../controller/doctrineController");
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, './public/image/doctrine');
    },
    filename: function(req, file, cb) {
      cb(null, Date.now()+".jpg");
    }
  });

  const upload = multer({storage: storage }); 

router.post("/adddoctrine", upload.single('image'), doctrineController.addnewdoctrine);
router.get("/ShowListDoctrine", doctrineController.ShowListDoctrine);
router.get("/DetailDoctrine/:id", doctrineController.DetailDoctrine);
router.put("/DetailDoctrine/:id/edit",upload.single('image'), doctrineController.EditDoctrine);
router.delete("/DeleteDoctrine/:id", doctrineController.DeleteDoctrine);


module.exports = router;