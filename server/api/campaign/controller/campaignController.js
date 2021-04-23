const Campaign = require("../model/Campaign");
const User = require('../../user/model/User')
const DonateLog = require('../../log/model/DonateLog')
const fs = require('fs');


exports.addnewcampaign = async(req,res) => {
  try{     
    console.log(req.body)
    const now = new Date();
    const add = new Campaign({
      name: req.body.name,
      content: req.body.content,
      image: req.file.filename,
      date: req.body.date,
      status : 'open',
      startdate: now,
      amount: req.body.amount,
      donate: 0,
      location: req.body.location,
      overview: req.body.overview,
      done: "รอความคืบหน้า",
      categories: req.body.categories,
    });
    console.log(add)
    let data = await add.save()
    res.status(201).json({ data });
  } catch (err) {
    res.status(400).json({ err: err });
    console.log(err)
  }
};

exports.ShowListCampaign = function(req,res){
  try{
    var result
    Campaign.find({},function(err, campaign){
      if(err){
        console.log(err)
      } else {
        console.log('else')
        campaign.sort(function(a, b){
          var dateA = new Date(a.startdate), dateB = new Date(b.startdate);
          return dateB -dateA;
      });
      // for(var i = 0; i <= (campaign.length - 1) ;i++){
      //   if(campaign[i].status != 'close'){
      //     result = campaign[i].expired()
      //   }
      //   if(result == 'yes'){
      //     campaign[i].status = "close"
      //     console.log('set close')
      //     campaign[i].save()
      //   } 
      // }
        
        res.json(campaign);

      }
    })
  } catch (err) {
    res.status(400).json({ err: err });
    console.log(err)
  }
}

exports.DetailCampaign = function(req,res){
  try{
    var result
    Campaign.findOne({_id : req.params.id},async function(err, campaign){
      if(err){
        console.log(err)
      } else {
        
          if(campaign.status != 'close'){
            result = campaign.expired()
          }
          if(result == 'yes'){
            campaign.status = "close"
            console.log('set close')
            campaign.save()
          } 

        res.json(campaign);
      }
    })
  } catch (err) {
    res.status(400).json({ err: err });
    console.log(err)
  }
}

exports.DeleteCampaign = function(req,res){
  try{
    Campaign.findOneAndDelete({_id : req.params.id}, async function(err, campaign){
      if(err){
        console.log(err)
      } else {
          const image  = './public/image/campaign/' + campaign.image;
          await fs.unlinkSync(image , function(err){
              if(err){
                  console.log(err);
              } else {
                console.log("unlink image success")
              } 
          })
        console.log('delete campaign completed')
      }
    })
  } catch (err) {
    res.status(400).json({ err: err });
    console.log(err)
  }
}

exports.EditCampaign = async(req,res) =>{
  try{
    var dataEdit
    console.log(req.params.id)
    console.log(req.body.name)
    console.log(req.body.content)
    console.log(req.body.imagepath)
    console.log(req.body.oldimage)
    if(req.file){
      if(req.file.filename != req.body.oldimage){
        const image  = './public/image/campaign/' + req.body.oldimage;
        fs.unlinkSync(image , function(err){
            if(err){
                console.log(err);
            } else {
              console.log("deleted")
            } 
        })
        dataEdit = {
          name: req.body.name,
          content: req.body.content,
          image: req.file.filename,
          amount : req.body.amount,
          date : req.body.date,
          location: req.body.location,
          overview: req.body.overview,
          done: req.body.done,
        }

      } else {
        console.log("not delete")
      }
    } else {
      dataEdit = {
          name: req.body.name,
          content: req.body.content,
          image: req.body.oldimage,
          amount : req.body.amount,
          date : req.body.date,
          location: req.body.location,
          overview: req.body.overview,
          done: req.body.done,
        }
    }
    // if(req.body.imagepath != req.body.oldimage){
    //   const image  = './public/uploads/' + req.body.imagepath;
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
    Campaign.findOneAndUpdate({_id : req.params.id},dataEdit,function(err, campaign){
      if(err){
        console.log(err)
      } else {
        console.log('success')
        console.log(campaign)
        console.log(dataEdit)
        res.status(201).json({ campaign });
      }
    })
  } catch (err) {
    res.status(400).json({ err: err });
    console.log(err)
  }
}

exports.files = function(req,res){
  const images = fs.readdirSync('public/image/campaign')
  var sorted = []
  console.log(images)
  for (let item of images){
    if(item.split('.').pop() === 'png'
    || item.split('.').pop() === 'jpg'
    || item.split('.').pop() === 'jpeg'
    || item.split('.').pop() === 'svg'){
      var abc = {
        "image" : "/addcampaignimage/"+item,
        "folder" : '/'
      }
      sorted.push(abc)
    }
  }
  res.send(sorted)
}

exports.addcampaignimage = function(req,res){
  res.redirect('back')
}

exports.deletecampaignimage = function(req,res){
  var url_del = 'public' + req.body.url_del
  console.log(url_del)
  if(fs.existsSync(url_del)){
    fs.unlinkSync(url_del)
  }
  res.redirect('back')
}

// exports.DonateCampaign = async function(req,res){
//   const amount = parseInt(req.params.amount, 10);
//   await Campaign.findOne({_id : req.params.campaign},function(err, campaign){
//     // console.log(campaign)
//     console.log('8h49dfghdfgh')
//     if(err){
//       console.log(err)
//     } else {
      
//         User.findOne({_id : req.params.id}, function(err, user){
          
//           const now = new Date();

//           const donatelog = new DonateLog({
//             amount : amount,
//             date : now
//           });
          
//           DonateLog.create(donatelog,function(err,log){
            
//             // console.log(log)

//             log.user.push(user)
//             log.campaign.push(campaign)
//             //////แก้ไขยอด coin user
//             user.point = user.point+amount/10
//             //////save ข้อมูล log เข้า donate log ของ user 
            
            
  
//             campaign.donate = campaign.donate+amount;
//             /////save ข้อมูล
//             campaign.save();
//             log.save();
//             user.save();
//             console.log(campaign)

//           })
//       })
      
//       res.status(201).json({ campaign });
//     }
//   })
//   res.status(201);
// }
