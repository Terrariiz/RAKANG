const User = require("../../user/model/User");
const Exchange = require('../../Exchange/model/Exchange');
const ExchangeLog = require("../../log/model/ExchangeLog");
const { fdatasync } = require("fs");
const cloudinary = require('cloudinary');
const ExchanceLog = require("../../log/model/ExchangeLog");
const { resolve } = require("path");
const fs = require("fs")
const func = require('./cloudinary')




////////////////////////////////////ยังไม่เสร็จ//////////////////////////////////
exports.addnewItem = async (req, res) => {
  try {
    var file = req.files
    const add = new Exchange({
      name: req.body.name,
      remain: req.body.remain,
      detail: req.body.detail,
      cost: req.body.cost,
    });
    var data = await add.save()
    const uploader = async (path) => await func.uploads(path);
        for (const files of file) {
          const { path } = files;
          const newPath = await uploader(path)
          console.log(newPath)
          data.galleryimage.push(newPath)
          data.save()
      }
        res.send('olkok');

  } catch (err) {
    res.status(400).json({ err: err });
    console.log(err)
  }
};


////////////////////////////////////ยังไม่เสร็จ//////////////////////////////////
exports.ShowListItem = function (req, res) {
  try {
    var result
    Exchange.find({}, function (err, exchangelist) {
      if (err) {
        console.log(err)
      } else {
        console.log('else')
        exchangelist.sort(function (a, b) {
          var dateA = new Date(a.cost), dateB = new Date(b.cost);
          return dateB - dateA;
        });
        res.json(exchangelist);
      }
    })
  } catch (err) {
    res.status(400).json({ err: err });
    console.log(err)
  }
}

exports.DetailItem = function (req, res) {
  try {
    Exchange.findOne({ _id: req.params.id }, async function (err, exchange) {
      if (err) {
        console.log(err)
      } else {
        res.json(exchange);
      }
    })
  } catch (err) {
    res.status(400).json({ err: err });
    console.log(err)
  }
}

////////////////////////////////////ยังไม่เสร็จ//////////////////////////////////
exports.DeleteItem = function (req, res) {
  try {
    Exchange.findOneAndDelete({ _id: req.params.id }, async function (err, exchange) {
      if (err) {
        console.log(err)
      } else {

        exchange.galleryimage.forEach(element => {
          cloudinary.uploader.destroy(element.cloudinary_id);
        });

      }
    })
  } catch (err) {
    res.status(400).json({ err: err });
    console.log(err)
  }
}

////////////////////////////////////ยังไม่เสร็จ//////////////////////////////////
exports.EditItem = async (req, res) => {
  try {
    var dataEdit
    var file = req.files
    console.log(file)
    console.log(file.length)
    if (file.length != 0) {
      if (req.body.deleteimage) {
        let this_Item = await Exchange.findById(req.params.id);
        console.log(this_Item.galleryimage)
        console.log('-------------------------')
        console.log(req.body.deleteimage)
        var deleteimage = req.body.deleteimage;
        if(Array.isArray(deleteimage) == true){
          console.log('array')
          deleteimage.forEach(DelImg => {
          this_Item.galleryimage.forEach(element => {
            console.log('count นอก')
            
              console.log('count ใน')

              if (element.image == DelImg){
                console.log('count')
                cloudinary.uploader.destroy(element.cloudinary_id);
                this_Item.galleryimage.remove(element)
                console.log('destroy')
                
              }

            })
          })
        }else{
          console.log('not array')
          this_Item.galleryimage.forEach(element => {
              if (element.image == deleteimage){
                cloudinary.uploader.destroy(element.cloudinary_id);
                this_Item.galleryimage.remove(element)
                console.log('destroy')
              }
          })
        }
        
        console.log('destroy success')
        this_Item.save()
        
      }


      var file = req.files
      dataEdit = {
        name: req.body.name,
        remain: req.body.remain,
        detail: req.body.detail,
        cost: req.body.cost,
      }
      var imagedata
      const uploader = async (path) => await func.uploads(path);

      Exchange.findOneAndUpdate({ _id: req.params.id }, dataEdit,async  function (err, exchange) {
        for (const files of file) {
          const { path } = files;
          const newPath = await uploader(path)
          console.log(newPath)
          exchange.galleryimage.push(newPath)
          exchange.save()
      }
        res.send('olkok');

      })

    } else if(req.body.deleteimage){
      let this_Item = await Exchange.findById(req.params.id);
        console.log(this_Item.galleryimage)
        console.log('-------------------------')
        console.log(req.body.deleteimage)
        var deleteimage = req.body.deleteimage;
        if(Array.isArray(deleteimage) == true){
          console.log('array')
          deleteimage.forEach(DelImg => {
          this_Item.galleryimage.forEach(element => {
            console.log('count นอก')
            
              console.log('count ใน')

              if (element.image == DelImg){
                console.log('count')
                cloudinary.uploader.destroy(element.cloudinary_id);
                this_Item.galleryimage.remove(element)
                console.log('destroy')
                
              }

            })
          })
        }else{
          console.log('not array')
          this_Item.galleryimage.forEach(element => {
              if (element.image == deleteimage){
                cloudinary.uploader.destroy(element.cloudinary_id);
                this_Item.galleryimage.remove(element)
                console.log('destroy')
              }
          })
        }
        
        console.log('destroy success')
        this_Item.save()
      dataEdit = {
        name: req.body.name,
        remain: req.body.remain,
        detail: req.body.detail,
        cost: req.body.cost,
      }
      Exchange.findOneAndUpdate({ _id: req.params.id }, dataEdit, function (err, exchange) {
        if (err) {
          console.log(err)
        } else {
          res.status(201).json({ exchange });
        }
      })

    }else{

      dataEdit = {
        name: req.body.name,
        remain: req.body.remain,
        detail: req.body.detail,
        cost: req.body.cost,
      }
      Exchange.findOneAndUpdate({ _id: req.params.id }, dataEdit, function (err, exchange) {
        if (err) {
          console.log(err)
        } else {
          res.status(201).json({ exchange });
        }
      })
    }

  } catch (err) {
    res.status(400).json({ err: err });
    console.log(err)
  }
}

exports.Purchase = function (req, res) {
  try {
    const now = new Date();
    console.log(req.body)
    var NumOfPurchase = 1
    const NewExchangeLog = new ExchangeLog({
      locationdetail: req.body.locationdetail,
      District: req.body.District,
      Sub_District: req.body.Sub_District,
      province: req.body.province,
      postcode: req.body.postcode,
      date : now
    });
    
      User.findOne({ _id: req.params.user }, function (err, user) {
        Exchange.findOne({ _id: req.params.id }, function (err, item) {
          if (user.point < item.cost) {
            let message = "แต้มของคุณมีไม่พอ"
            return res.json(message)
          }
          if (item.remain < NumOfPurchase) {
            let message = "ขออภัยสินค้าหมด"
            return res.json(message)
          }
          ExchangeLog.create(NewExchangeLog, function (err, exlog) {
          exlog.user = user
          exlog.item = item
          user.point = user.point - item.cost

          item.remain = item.remain - NumOfPurchase

          item.waitingorder.push(exlog)
          user.exchangelog.push(exlog)

          user.save()
          item.save()
          exlog.save()
          return res.json(exlog);
        })
        })
      })
    
  } catch (err) {
    res.status(400).json({ err: err });
    console.log(err)
  }
}

exports.ShowOrder = function (req, res) {
  try {
    console.log('this')
    Exchange.find().populate({path:"waitingorder" , model : ExchangeLog}).populate({path:"confirmorder" , model : ExchangeLog}).exec(async function(err, exchange){
      if(err){
        console.log(err)
      } else {
        return res.json(exchange);
      }
    })
  } catch (err) {
    res.status(400).json({ err: err });
    console.log(err)
  }
}

exports.AcceptOrder = function (req, res) {
  try {
    var Accepted = req.body.AcceptList;
    var test = ['df', 'fdf']
    console.log(req.body.AcceptList)
    console.log(Accepted)
    console.log(test)
    Exchange.findById({ _id: req.params.id }.populate({ path: "waitingorder", model: ExchangeLog }), async function (err, exchange) {
      // Exchange.findById(req.params.id).populate({path:"waitingorder" , model : ExchangeLog}).populate({path:"confirmorder" , model : ExchangeLog}).exec(async function(err, exchange){
      if (err) {
        console.log(err)
      } else {
        Accepted.forEach(accept => {
          exchange.waitingorder.forEach(order => {
            console.log(accept)
            console.log(order)
            if (order == accept) {
              console.log('equal')
              exchange.waitingorder.status = ""
              exchange.waitingorder.remove(order)
              exchange.confirmorder.push(order)

            }
          })
        });
        exchange.save();
        res.json(exchange);
      }
    })
  } catch (err) {
    res.status(400).json({ err: err });
    console.log(err)
  }
}

exports.GetUserExchangeLog = function (req, res) {
  try {
    console.log('this')
    User.findById(req.params.id).populate({ path: "exchangelog", model: ExchangeLog }).exec(async function (err, exchange) {
      if (err) {
        console.log(err)
      } else {
        return res.json(exchange);
      }
    })
  } catch (err) {
    res.status(400).json({ err: err });
    console.log(err)
  }
}

exports.GetExchangeLogItem = function (req, res) {
  try {
    console.log('this')
    Exchange.findById(req.params.id).populate({ path: "waitingorder", model: ExchangeLog }).populate({ path: "confirmorder", model: ExchangeLog }).exec(async function (err, exchange) {
      if (err) {
        console.log(err)
      } else {
        return res.json(exchange);
      }
    })
  } catch (err) {
    res.status(400).json({ err: err });
    console.log(err)
  }
}
