const Campaign = require("../model/Campaign");
const User = require('../../user/model/User')
const DonateLog = require('../../log/model/DonateLog')
const multer = require('multer');
const fs = require('fs');
var ObjectID = require('mongodb').ObjectID;

exports.addnewcampaign = async(req,res) => {
  try{     
    console.log(req.body)
    const add = new Campaign({
      name: req.body.name,
      content: req.body.content,
      image: req.file.filename,
      date: req.body.date,
      amount: req.body.amount,
      donate: 0
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
    Campaign.find({},function(err, campaign){
      if(err){
        console.log(err)
      } else {
        console.log('else')
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
    Campaign.findOne({_id : req.params.id},function(err, campaign){
      if(err){
        console.log(err)
      } else {
        res.send(campaign);
      }
    })
  } catch (err) {
    res.status(400).json({ err: err });
    console.log(err)
  }
}

exports.DeleteCampaign = function(req,res){
  try{
    Campaign.findOneAndDelete({_id : req.params.id},function(err, campaign){
      if(err){
        console.log(err)
      } else {
          const image  = './public/uploads/' + campaign.image;
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
        const image  = './public/uploads/' + req.body.oldimage;
        fs.unlink(image , function(err){
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
          date : req.body.date
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
          date : req.body.date
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

exports.DonateCampaign = async function(req,res){
  const amount = parseInt(req.params.amount, 10);
  await Campaign.findOne({_id : req.params.campaign},function(err, campaign){
    console.log(campaign)
    console.log('8h49dfghdfgh')
    if(err){
      console.log(err)
    } else {
      
        User.findOne({_id : req.params.id}, function(err, user){
          
          const now = new Date();

          const donatelog = new DonateLog({
            amount : amount,
            date : now
          });

          DonateLog.create(donatelog,function(err,log){
            console.log(log)

            log.user.push(user)
            log.campaign.push(campaign)
            //////แก้ไขยอด coin user
            user.coin = user.coin-amount;
            //////save ข้อมูล log เข้า donate log ของ user 
            user.donatelog.push(log)

            campaign.donatelist.push(log)
  
            campaign.donate = campaign.donate+amount;
            /////save ข้อมูล
            campaign.save();
            log.save();
            user.save();
            console.log(campaign)

          })
      })
      
      res.status(201).json({ campaign });
    }
  })
  res.status(201);
}
