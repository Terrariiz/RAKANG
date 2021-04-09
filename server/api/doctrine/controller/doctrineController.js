const Doctrine = require("../model/Doctrine");
const User = require('../../user/model/User')
const multer = require('multer');
const fs = require('fs');


exports.addnewdoctrine = async(req,res) => {
    try{     
      console.log(req.body)
      const today = new Date();
      const doctrine = new Doctrine({
        title: req.body.title,
        content: req.body.content,
        image: req.file.filename,
        edittime : today,
        categories: req.body.categories,
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
        doctrine.sort(function(a, b){
            return new Date(b.edittime) - new Date(a.edittime);
        });
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
    const today = new Date();
    if(req.file){
      if(req.file.filename != req.body.oldimage){
        const image  = './public/image/doctrine/' + req.body.oldimage;
        fs.unlinkSync(image , function(err){
            if(err){
                console.log(err);
            } else {
              console.log("deleted")
            } 
        })
        dataEdit = {
          title: req.body.title,
          content: req.body.content,
          image: req.file.filename,
          edittime : today
        }

      } else {
        console.log("not delete")
      }
    } else {
      dataEdit = {
          title: req.body.title,
          content: req.body.content,
          image: req.body.oldimage,
          edittime : today
        }
    }
    // if(req.file.filename != req.body.oldimage){
    //   const image  = './public/uploads/' + req.body.oldimage;
    //   fs.unlink(image , function(err){
    //       if(err){
    //           console.log(err);
    //       } else {
    //         console.log("deleted")
    //       } 
    //   })
    // } else {
    //   console.log("not delete")
    // }
    Doctrine.findOneAndUpdate({_id : req.params.id},dataEdit,function(err, doctrine){
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
          const image  = './public/image/doctrine/' + doctrine.image;
          fs.unlinkSync(image , function(err){
              if(err){
                  console.log(err);
              } else {
                console.log("unlink image success")
              } 
          })
          User.find({favdoctrinelist : doctrine._id}, function(err , user){
            if(err){
                console.log(err)
            } else {
            console.log(user)
            for(let j = 0 ; j < user.length ; j++){
                for(let k = 0 ; k < user[j].favdoctrinelist.length ; k++){
                    if(user[j].favdoctrinelist[k].equals(doctrine._id)){
                      user[j].favdoctrinelist.pull(doctrine._id);
                      user[j].save();
                      console.log('removed from user favourite list');
                    }
                }
             }
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

exports.ShowFavDoctrine = async(req,res) =>{
  try{
    User.findById(req.params.id).populate("favdoctrinelist").exec(function(err, userdetail){
      if(err){
        console.log(err)
      }else{
        console.log('getuserfavlog')
        console.log(userdetail)
        res.json(userdetail)
      }
    }) 
    
  } catch (err) {
    res.status(400).json({ err: err });
    console.log(err)
  }
}



  
  



