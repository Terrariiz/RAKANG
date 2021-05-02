const mongoose = require("mongoose");

const donateSchema = new mongoose.Schema({
  campaign:{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Campaign',
  },
  CampaignName:{
    type:String
  },
  UserName:{
    type:String
  },
  result:{
    type:String
  },
  ChangeRank:{
    type:String
  },
  user:
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  ,
  amount: {
    type: Number, 
  },
  date: {
    type: Date,
  },
 
});

const DonateLog = mongoose.model("DonateLog", donateSchema);
module.exports = DonateLog;