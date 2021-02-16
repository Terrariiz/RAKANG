const CoinLog = require("../model/CoinLog");
const User = require("../../user/model/User");


exports.coinloglist = function(req,res){
  try{
    User.findById({_id: req.params.id}, function(err, user){
      console.log('getuser')
      console.log(user)
      CoinLog.find({_id : user.coinlog},function(err, list){
        if(err){
          console.log(err)
        } else {
          console.log(list)
          console.log('getlist')
          res.json(list);
        }
      })
    })
    
  } catch (err) {
    res.status(400).json({ err: err });
    console.log(err)
  }
}