const Doctrine = require("../model/Doctrine");
const multer = require('multer');


exports.addnewdoctrine = async(req,res) => {
    try{     
      console.log(req.body)
      const doctrine = new Doctrine({
        title: req.body.title,
        content: req.body.content,
        image: req.body.imagepath
      });
      console.log(doctrine)
      let data = await doctrine.save()
      res.status(201).json({ data });
    } catch (err) {
      res.status(400).json({ err: err });
      console.log(err)
    }
}

