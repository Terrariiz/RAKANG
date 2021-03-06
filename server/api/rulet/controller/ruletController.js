const Rulet = require("../model/Rulet");
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
    Rulet.findOne({_id : req.params.id},function(err, rulet){
      if(err){
        console.log(err)
      } else {
        res.send(rulet);
      }
    })
  } catch (err) {
    res.status(400).json({ err: err });
    console.log(err)
  }
}

// exports.DeleteNews = function(req,res){
  
//   try{
//     News.findOneAndDelete({_id : req.params.id},function(err, news){
//       if(err){
//         console.log(err)
//       } else {
//           const image  = './public/image/new/' + news.image;
//           fs.unlink(image , function(err){
//               if(err){
//                   console.log(err);
//               } else {
//                 console.log("unlink image success")
//               } 
//           })
//         console.log('delete news completed')
//       }
//     })
//   } catch (err) {
//     res.status(400).json({ err: err });
//     console.log(err)
//   }
// }

// exports.EditNews = async(req,res) =>{
//   try{
//     var dataEdit
//     console.log(req.params.id)
//     console.log(req.body.title)
//     console.log(req.body.content)
//     console.log(req.body.imagepath)
//     console.log(req.body.oldimage)
//     const today = new Date();
//     if(req.file){
//       if(req.file.filename != req.body.oldimage){
//         const image  = './public/image/new/' + req.body.oldimage;
//         fs.unlink(image , function(err){
//             if(err){
//                 console.log(err);
//             } else {
//               console.log("deleted")
//             } 
//         })
//         dataEdit = {
//           title: req.body.title,
//           content: req.body.content,
//           image: req.file.filename,
//           date: today
//         }

//       } else {
//         console.log("not delete")
//       }
//     } else {
//       dataEdit = {
//           title: req.body.title,
//           content: req.body.content,
//           image: req.body.oldimage,
//           date: today
//         }
//     }
//     News.findOneAndUpdate({_id : req.params.id},dataEdit,function(err, news){
//       if(err){
//         console.log(err)
//       } else {
//         console.log('success')
//         res.status(201).json({ news });
//       }
//     })
//   } catch (err) {
//     res.status(400).json({ err: err });
//     console.log(err)
//   }
// }
