const Doctrine = require("../model/Doctrine");

exports.addnewdoctrine = async(req,res) => {
    try{
      console.log(req.body.title)
      console.log(req.body.content)
    const doctrine = new Doctrine({
        title: req.body.title,
        content: req.body.content,
      });
      console.log(doctrine)
      let data = await doctrine.save()
      res.status(201).json({ data });
    } catch (err) {
      res.status(400).json({ err: err });
      console.log(err)
    }
}