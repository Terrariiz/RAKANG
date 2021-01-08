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


exports.ShowListDoctrine = function(req,res){
  try{
    Doctrine.find({},function(err, doctrine){
      if(err){
        console.log(err)
      } else {
        console.log('else')
        res.json(doctrine);
      }
    })
  } catch (err) {
    res.status(400).json({ err: err });
    console.log(err)
  }
}

exports.DetailDoctrine = function(req,res){
  try{
    Doctrine.findOne({_id : req.params.id},function(err, doctrine){
      if(err){
        console.log(err)
      } else {
        res.send(doctrine);
      }
    })
  } catch (err) {
    res.status(400).json({ err: err });
    console.log(err)
  }
}

exports.DeleteDoctrine = function(req,res){
  try{
    Doctrine.find({_id : id},function(err, doctrine){
      if(err){
        console.log(err)
      } else {
        doctrine.deleteOne({_id : req.params.id})
      }
    })
  } catch (err) {
    res.status(400).json({ err: err });
    console.log(err)
  }
}
  
  



