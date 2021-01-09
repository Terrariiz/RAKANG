const News = require("../model/News");
const multer = require('multer');



  
  
exports.addnews = async(req,res) => {
  try{     
    console.log(req.body)
    const add = new News({
      title: req.body.title,
      content: req.body.content,
      image: req.body.imagepath
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
    News.find({_id : id},function(err, news){
      if(err){
        console.log(err)
      } else {
        news.deleteOne({_id : req.params.id})
      }
    })
  } catch (err) {
    res.status(400).json({ err: err });
    console.log(err)
  }
}


