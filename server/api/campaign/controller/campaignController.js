const Campaign = require("../model/Campaign");
const User = require('../../user/model/User')
const DonateLog = require('../../log/model/DonateLog')
const fs = require('fs');
const cloudinary = require("cloudinary").v2
const countapi = require('countapi-js');

cloudinary.config({
  cloud_name: "koladon52",
  api_key: "413217853994171",
  api_secret: "DOHByZlRxxocIbvEmAzgnvmnv-E",
})


exports.addnewcampaign = async (req, res) => {
  try {
    var image
    cloudinary.uploader.upload(req.file.path, async function (err, result) {
      image = result.url
      console.log(req.body)
      const now = new Date();
      const add = new Campaign({
        name: req.body.name,
        content: req.body.content,
        image: image,
        cloudinary_id: result.public_id,
        date: req.body.date,
        status: 'open',
        startdate: now,
        amount: req.body.amount,
        donate: 0,
        location: req.body.location,
        overview: req.body.overview,
        done: "รอความคืบหน้า",
        categories: req.body.categories,
      });

      let data = await add.save()
      var option = {
        key: 'CampaignView',
        namespace: "Rakang_Campaign_" + data._id,
      }
      countapi.create(option).then((result) => {
        console.log(result)
        data.count_api_namespace = result.namespace
        data.count_api_key = result.key
        data.save()
        res.status(201).json({ data });
      });
      // data.view = "https://api.countapi.xyz/create?namespace=Rakang_Campaign_"+data._id+"?key=DoctrineView"
      // await data.save()

    })

  } catch (err) {
    res.status(400).json({ err: err });
    console.log(err)
  }
};

exports.ShowListCampaign = function (req, res) {
  try {
    var result
    Campaign.find({}, function (err, campaign) {
      if (err) {
        console.log(err)
      } else {
        console.log('else')
        campaign.sort(function (a, b) {
          var dateA = new Date(a.startdate), dateB = new Date(b.startdate);
          return dateB - dateA;
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

        res.json(campaign)
      }
    })
  } catch (err) {
    res.status(400).json({ err: err });
    console.log(err)
  }
}

exports.DetailCampaign = function (req, res) {
  try {
    var result
    Campaign.findOne({ _id: req.params.id }, async function (err, campaign) {
      if (err) {
        console.log(err)
      } else {

        if (campaign.status != 'close') {
          result = campaign.expired()
        }
        if (result == 'yes') {
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

exports.DeleteCampaign = function (req, res) {
  try {
    Campaign.findOneAndDelete({ _id: req.params.id }, async function (err, campaign) {
      if (err) {
        console.log(err)
      } else {
        await cloudinary.uploader.destroy(campaign.cloudinary_id);
        // const image  = './public/image/campaign/' + campaign.image;
        // await fs.unlinkSync(image , function(err){
        //     if(err){
        //         console.log(err);
        //     } else {
        //       console.log("unlink image success")
        //     } 
        // })
        console.log('delete campaign completed')
      }
    })
  } catch (err) {
    res.status(400).json({ err: err });
    console.log(err)
  }
}

exports.EditCampaign = async (req, res) => {
  try {
    var dataEdit
    if (req.file) {
      if (req.file.filename != req.body.oldimage) {


        var this_campaign = await Campaign.findById(req.params.id);
        await cloudinary.uploader.destroy(this_campaign.cloudinary_id);
        this_campaign.save();

        await cloudinary.uploader.upload(req.file.path, function (err, result) {


          dataEdit = {
            name: req.body.name,
            content: req.body.content,
            image: result.url,
            cloudinary_id: result.public_id,
            amount: req.body.amount,
            date: req.body.date,
            location: req.body.location,
            overview: req.body.overview,
            done: req.body.done,
          }

          Campaign.findOneAndUpdate({ _id: req.params.id }, dataEdit, function (err, campaign) {
            if (err) {
              console.log(err)
            } else {
              console.log('success')
              console.log(campaign)
              console.log(dataEdit)
              res.status(201).json({ campaign });
            }
          })


        })


      } else {
        console.log("not delete")
      }
    } else {
      dataEdit = {
        name: req.body.name,
        content: req.body.content,
        image: req.body.oldimage,
        amount: req.body.amount,
        date: req.body.date,
        location: req.body.location,
        overview: req.body.overview,
        done: req.body.done,
      }
      Campaign.findOneAndUpdate({ _id: req.params.id }, dataEdit, function (err, campaign) {
        if (err) {
          console.log(err)
        } else {
          console.log('success')
          console.log(campaign)
          console.log(dataEdit)
          res.status(201).json({ campaign });
        }
      })
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

  } catch (err) {
    res.status(400).json({ err: err });
    console.log(err)
  }
}

exports.files = function (req, res) {
  const images = fs.readdirSync('public/image/campaign')
  var sorted = []
  console.log(images)
  for (let item of images) {
    if (item.split('.').pop() === 'png'
      || item.split('.').pop() === 'jpg'
      || item.split('.').pop() === 'jpeg'
      || item.split('.').pop() === 'svg') {
      var abc = {
        "image": "/addcampaignimage/" + item,
        "folder": '/'
      }
      sorted.push(abc)
    }
  }
  res.send(sorted)
}

exports.addcampaignimage = function (req, res) {
  res.redirect('back')
}

exports.deletecampaignimage = function (req, res) {
  var url_del = 'public' + req.body.url_del
  console.log(url_del)
  if (fs.existsSync(url_del)) {
    fs.unlinkSync(url_del)
  }
  res.redirect('back')
}

