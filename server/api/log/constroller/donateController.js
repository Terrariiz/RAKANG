const User = require("../../user/model/User");
const Campaign = require('../../campaign/model/Campaign');
const DonateLog = require("../../log/model/DonateLog")

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

exports.CheckDonate = async function(req, res){
  try{
    var result 
    await User.findById(req.params.id).populate("donatelog").exec(function(err, list){
      if(err){
        console.log(err)
      }else{
        var index = list.donatelog.length-1
        
        if(index == -1){
          result = false;
          res.send(result);
        }
        else if(list.donatelog[index].result == 'incomplete'){
          DonateLog.findByIdAndRemove(list.donatelog[index]._id,function(err){
            if(err){
              console.log(err)
            } else {
              list.donatelog.pop() 
              list.save()
              result = 'incomplete'
              res.send(result);
            }
          })
        }else if(list.donatelog[index].result == 'complete'){
          list.donatelog[index].result = 'alerted';
          result = 'complete'
          list.donatelog[index].save()
          res.send(result);
        }

      } 
    })
  } catch(err){

  }
}