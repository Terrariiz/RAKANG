const Donate = require("../model/DonateLog");
const User = require("../../user/model/User");


exports.donateloglist = function(req,res){
  try{
    User.findById({_id: req.params.id}, function(err, user){
      console.log('getuser')
      console.log(user)
      Donate.find({_id : user.donatelog},function(err, list){
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