const express = require("express");
const router = express.Router();

router.post("/", function(res,req){

    console.log(req.body)

    this.$http.get("/user/"+decoded._id)
      .then((res) => {
        this.dataUser = res.data;
      })

});


module.exports = router;