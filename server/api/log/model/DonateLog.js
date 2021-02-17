const mongoose = require("mongoose");

const newSchema = new mongoose.Schema({
  campaign:{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Campaign',
  
  },
  CampaignName:{
    type:String
  },
  user:
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  ,
  amount: {
    type: String, 
  },
  date: {
    type: Date,
  },
 
});

const DonateLog = mongoose.model("DonateLog", newSchema);
module.exports = DonateLog;