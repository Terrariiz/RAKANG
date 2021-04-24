const express = require("express");
const router = express.Router();
const exchangeController = require("../constroller/exchangeController");
const multer = require('multer');
const path = require('path')
;
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, './public/image/exchangeitem');
    },
    filename: function(req, file, cb) {
      cb(null, "exchangeitem-"+Date.now()+path.extname(file.originalname));
    }
  });

const upload = multer({storage: storage }).array("multi-files",10); 

router.post("/addnewItem", upload, exchangeController.addnewItem);
router.get("/ShowListItem", exchangeController.ShowListItem);
router.get("/DetailItem/:id", exchangeController.DetailItem);
router.get("/DetailItem/:id/ShowOrder", exchangeController.ShowOrder);
router.put("/EditItem/:id/edit",upload, exchangeController.EditItem);
router.delete("/DeleteItem/:id", exchangeController.DeleteItem);
router.post("/DetailItem/:id/Perchase/:user", exchangeController.Purchase);
router.get("/DetailItem/:id/ShowOrder", exchangeController.ShowOrder);
router.post("/DetailItem/:id/AcceptOrder", exchangeController.AcceptOrder);

router.get("/GetUserExchangeLog/:id", exchangeController.GetUserExchangeLog);
router.get("/GetExchangeLogItem/:id", exchangeController.GetExchangeLogItem);



module.exports = router;