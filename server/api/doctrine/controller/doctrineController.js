const Doctrine = require("../model/Doctrine");
const multer = require('multer');
const fs = require('fs');


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


exports.ShowListDoctrine = async(req,res) =>{
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

exports.EditDoctrine = async(req,res) =>{
  try{
    console.log(req.params.id)
    console.log(req.body.title)
    console.log(req.body.content)
    console.log(req.body.imagepath)
    console.log(req.body.oldimage)
    if(req.body.imagepath == req.body.oldimage){
      const image  = './public/uploads/' + req.body.imagepath;
      fs.unlink(image , function(err){
          if(err){
              console.log(err);
          } else {
            console.log("deleted")
          } 
      })
    } else {
      console.log("not delete")
    }
    Doctrine.findOneAndUpdate({_id : req.params.id},{title : req.body.title , content : req.body.content , image : req.body.imagepath},function(err, doctrine){
      if(err){
        console.log(err)
      } else {
        console.log('success')
        res.status(201).json({ doctrine });
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
    Doctrine.findOneAndDelete({_id : req.params.id},function(err, doctrine){
      if(err){
        console.log(err)
      } else {
          const image  = './public/uploads/' + doctrine.image;
          fs.unlink(image , function(err){
              if(err){
                  console.log(err);
              } else {
                console.log("unlink image success")
              } 
          })
        console.log('delete doctrine completed')
      }
    })
  } catch (err) {
    res.status(400).json({ err: err });
    console.log(err)
  }
}
  
  



