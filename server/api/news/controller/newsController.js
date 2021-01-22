const News = require("../model/News");
const multer = require('multer');
const fs = require('fs');



  
  
exports.addnews = async(req,res) => {
  try{     
    console.log(req.body)
    const add = new News({
      title: req.body.title,
      content: req.body.content,
      image: req.file.filename
    });
    console.log(add)
    let data = await add.save()
    res.status(201).json({ data });
  } catch (err) {
    res.status(400).json({ err: err });
    console.log(err)
  }
};

exports.ShowListNews = function(req,res){
  try{
    News.find({},function(err, news){
      if(err){
        console.log(err)
      } else {
        console.log('else')
        res.json(news);
      }
    })
  } catch (err) {
    res.status(400).json({ err: err });
    console.log(err)
  }
}

exports.DetailNews = function(req,res){
  try{
    News.findOne({_id : req.params.id},function(err, news){
      if(err){
        console.log(err)
      } else {
        res.send(news);
      }
    })
  } catch (err) {
    res.status(400).json({ err: err });
    console.log(err)
  }
}

exports.DeleteNews = function(req,res){
  try{
    News.findOneAndDelete({_id : req.params.id},function(err, news){
      if(err){
        console.log(err)
      } else {
          const image  = './public/uploads/' + news.image;
          fs.unlink(image , function(err){
              if(err){
                  console.log(err);
              } else {
                console.log("unlink image success")
              } 
          })
        console.log('delete news completed')
      }
    })
  } catch (err) {
    res.status(400).json({ err: err });
    console.log(err)
  }
}

exports.EditNews = async(req,res) =>{
  try{
    var dataEdit
    console.log(req.params.id)
    console.log(req.body.title)
    console.log(req.body.content)
    console.log(req.body.imagepath)
    console.log(req.body.oldimage)
    if(req.file){
      if(req.file.filename != req.body.oldimage){
        const image  = './public/uploads/' + req.body.oldimage;
        fs.unlink(image , function(err){
            if(err){
                console.log(err);
            } else {
              console.log("deleted")
            } 
        })
        dataEdit = {
          title: req.body.title,
          content: req.body.content,
          image: req.file.filename
        }

      } else {
        console.log("not delete")
      }
    } else {
      dataEdit = {
          title: req.body.title,
          content: req.body.content,
          image: req.body.oldimage
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
    News.findOneAndUpdate({_id : req.params.id},dataEdit,function(err, news){
      if(err){
        console.log(err)
      } else {
        console.log('success')
        res.status(201).json({ news });
      }
    })
  } catch (err) {
    res.status(400).json({ err: err });
    console.log(err)
  }
}
