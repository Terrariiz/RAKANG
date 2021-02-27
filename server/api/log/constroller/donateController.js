const User = require("../../user/model/User");
const Campaign = require('../../campaign/model/Campaign')

exports.donateloguser = async function(req,res){
  try{
    await User.findById(req.params.id).populate("donatelog").exec(function(err, list){
      if(err){
        console.log(err)
      }else{
        console.log('getuser')
        console.log(list)
        res.json(list);
      }
    })
  } catch (err) {
    res.status(400).json({ err: err });
    console.log(err)
  }
}

exports.donatelogcampaign = async function(req,res){
  try{
    console.log('fuck')
    await Campaign.findById(req.params.id).populate("donatelist").exec(function(err, campaignlog){
      if(err){
        console.log(err)
      }else{
        console.log('getcampaignlog')
        console.log(campaignlog)
        res.json(campaignlog);
      }
    }) 
  } catch (err) {
    res.status(400).json({ err: err });
    console.log(err)
  }
}