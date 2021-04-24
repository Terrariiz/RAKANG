const User = require("../../user/model/User");
const Exchange = require('../../Exchange/model/Exchange');
const ExchangeLog = require("../../log/model/ExchangeLog");
const { fdatasync } = require("fs");
const ExchanceLog = require("../../log/model/ExchangeLog");


////////////////////////////////////ยังไม่เสร็จ//////////////////////////////////
exports.addnewItem = async(req,res) => {
  try{   
    if(req.files){
      const add = new Exchange({
        name   : req.body.name,
        remain : req.body.remain,
        detail : req.body.detail,
        cost   : req.body.cost,
        overviewimage: req.files[0].filename,
      });
      
      console.log(req.files[3])
      for(var i = 1 ; i < req.files.length ; i++){
        console.log(i)
        console.log(req.files[i].filename)
        add.galleryimage.push(req.files[i].filename)
      }
      var data = await add.save()
      data.save()
      
    }  
    res.status(201).json({ data });
  } catch (err) {
    res.status(400).json({ err: err });
    console.log(err)
  }
};


////////////////////////////////////ยังไม่เสร็จ//////////////////////////////////
exports.ShowListItem = function(req,res){
  try{
    var result
    Exchange.find({},function(err, exchangelist){
      if(err){
        console.log(err)
      } else {
        console.log('else')
        exchangelist.sort(function(a, b){
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

exports.DetailItem = function(req,res){
  try{
    Exchange.findOne({_id : req.params.id},async function(err, exchange){
      if(err){
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
exports.DeleteItem = function(req,res){
  try{
    Exchange.findOneAndDelete({_id : req.params.id}, async function(err, exchange){
      if(err){
        console.log(err)
      } else {
        ////////////////////////////////////ยังไม่เสร็จ//////////////////////////////////
        Exchange.findById({_id : req.params.id},async function(err, exchange){
          const image  = './public/image/exchange/' + exchange.image;
          await fs.unlinkSync(image , function(err){
              if(err){
                  console.log(err);
              } else {
                console.log("unlink image success")
              } 
          })
        })
          
        console.log('delete exchangeitem completed')
      }
    })
  } catch (err) {
    res.status(400).json({ err: err });
    console.log(err)
  }
}

////////////////////////////////////ยังไม่เสร็จ//////////////////////////////////
exports.EditItem = async(req,res) =>{
  try{
    var dataEdit
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
          ramain: req.body.ramain,
          //image: req.file.filename,
          detail : req.body.detail,
          cost : req.body.cost,
        }

      } else {
        console.log("not delete")
      }
    } else {
      dataEdit = {
          name: req.body.name,
          ramain: req.body.ramain,
          //image: req.body.oldimage,
          detail : req.body.detail,
          cost : req.body.cost,
        }
    }
    Exchange.findOneAndUpdate({_id : req.params.id},dataEdit,function(err, exchange){
      if(err){
        console.log(err)
      } else {
        console.log('success')
        console.log(campaign)
        console.log(dataEdit)
        res.status(201).json({ exchange });
      }
    })
  } catch (err) {
    res.status(400).json({ err: err });
    console.log(err)
  }
}

exports.Purchase = function(req,res){
  try{
    console.log(req.body)
    var NumOfPurchase = req.body.Number
    const NewExchangeLog = new ExchangeLog({
      locationdetail   : req.body.locationdetail,
      District : req.body.District,
      Sub_District : req.body.Sub_District,
      province   : req.body.province,
      postcode   : req.body.postcode
    });
    ExchangeLog.create(NewExchangeLog,function(err,exlog){
        User.findOne({_id:req.params.user},function(err,user){
          Exchange.findOne({_id:req.params.id},function(err,item){
            if(user.point  <   item.cost){
              let message = "แต้มของคุณมีไม่พอ"
              return res.json(message)
            }
            if(item.remain < NumOfPurchase){
              let message = "ขออภัยสินค้าหมด"
              return res.json(message)
            }
              exlog.user = user
              exlog.item = item
              user.point = user.point-item.cost
              
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

exports.ShowOrder = function(req,res){
  try{
    console.log('this')
    Exchange.findById(req.params.id).populate({path:"waitingorder" , model : ExchangeLog}).populate({path:"confirmorder" , model : ExchangeLog}).exec(async function(err, exchange){
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

exports.AcceptOrder = function(req,res){
  try{
    var Accepted = req.body.AcceptList;
    var test     = ['df','fdf']
    console.log(req.body.AcceptList)
    console.log(Accepted)
    console.log(test)
    Exchange.findById({_id : req.params.id}.populate({path:"waitingorder" , model : ExchangeLog}),async function(err, exchange){
    // Exchange.findById(req.params.id).populate({path:"waitingorder" , model : ExchangeLog}).populate({path:"confirmorder" , model : ExchangeLog}).exec(async function(err, exchange){
      if(err){
        console.log(err)
      } else {
        Accepted.forEach(accept => {
          exchange.waitingorder.forEach(order => {
            console.log(accept)
            console.log(order)
            if(order == accept){
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

exports.GetUserExchangeLog = function(req,res){
  try{
    console.log('this')
    User.findById(req.params.id).populate({path:"exchangelog" , model : ExchangeLog}).exec(async function(err, exchange){
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

exports.GetExchangeLogItem = function(req,res){
  try{
    console.log('this')
    Exchange.findById(req.params.id).populate({path:"waitingorder" , model : ExchangeLog}).populate({path:"confirmorder" , model : ExchangeLog}).exec(async function(err, exchange){
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
