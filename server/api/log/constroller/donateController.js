const Donate = require("../model/DonateLog");
const User = require("../../user/model/User");
const Campaign = require("../../campaign/model/Campaign")

// Donate.find({_id : user.donatelog}.populate("donatecampaign").exec(function(err, list){
  // Donate.find({_id : user.donatelog}.populate("donatecampaign").exec(function(err, list){

exports.donateloglist = function(req,res){
  try{
    User.findById(req.params.id).populate("donatelog").exec(function(err, list){
      if(err){
        console.log(err)
      }else{
        console.log('getuser')
        console.log(list)
        res.json(list);
      }
      
      // Donate.find({_id : user.donatelog},function(err, list){
      //   if(err){
      //     console.log(err)
      //   } else {

      //     list.populate('camapign').execPopulate();

      //     console.log("this is a "+a)
          

      //     console.log(list)
      //     console.log('getlist')
          
      //   }
      // })
    })
    
  } catch (err) {
    res.status(400).json({ err: err });
    console.log(err)
  }
}

exports.donatelogcampaign = function(req,res){
  try{
    Campaign.findById(req.params.id).populate("donatelog").exec(function(err, user){
      console.log('getuser')
      console.log(user)
      // Donate.find({_id : user.donatelog},function(err, list){
      //   if(err){
      //     console.log(err)
      //   } else {

      //     var a = person.populate('stories').execPopulate();

      //     console.log("this is a "+a)

      //     console.log(list)
      //     console.log('getlist')
      //     res.json(list);
      //   }
      // })
    })
    
  } catch (err) {
    res.status(400).json({ err: err });
    console.log(err)
  }
}