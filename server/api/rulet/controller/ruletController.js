const Rulet = require("../model/Rulet");
const Random = require("../model/Random");
const fs = require('fs');
  
exports.addrulet = async(req,res) => {
  try{     
    console.log(req.body)
    const add = new Rulet({
      CNumber: req.body.CNumber,
      content: req.body.content,
    });
    console.log(add)
    let data = await add.save()
    res.status(201).json({ data });
  } catch (err) {
    res.status(400).json({ err: err });
    console.log(err)
  }
};

// exports.ShowListNews = function(req,res){
//   try{
//     News.find({},function(err, news){
//       if(err){
//         console.log(err)
//       } else {
//         console.log('else')
//         res.json(news);
//       }
//     })
//   } catch (err) {
//     res.status(400).json({ err: err });
//     console.log(err)
//   }
// }

exports.ShowCard = function(req,res){
  try{
    Rulet.find({CNumber : req.params.id},function(err, rulet){
      if(err){
        console.log(err)
      } else {
        console.log(rulet)
        res.send(rulet);
      }
    })
  } catch (err) {
    res.status(400).json({ err: err });
    console.log(err)
  }
}


exports.test = async(req,res) => {
  try{     
    console.log(req.body)
    const add = new Random({
      id: req.body.id,
      content: req.body.content,
    });
    console.log(add)
    let data = await add.save()
    res.status(201).json({ data });
  } catch (err) {
    res.status(400).json({ err: err });
    console.log(err)
  }
};
exports.seamsi = async (req,res) => {  
  try{     
  const add = {
    uid:  req.params.id,
    content: req.body.content
  }
  console.log(add)
  Random.findByIdAndUpdate({_id : req.params.id},add,function(err, sam){
    if(err){
      console.log(err)
    } else {
      console.log('success')
      console.log(sam)
      console.log(add)
      res.status(201).json({ sam });
    }
  })
 } catch (err) {
  res.status(400).json({ err: err });
  console.log(err)
}
}