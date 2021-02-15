const mongoose = require("mongoose");
const newSchema = new mongoose.Schema({
  campaign:{
      type: mongoose.Schema.Types.ObjectId,
      ref: '../../user/model/Campaign',
      
  }
,
  user:
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: '../../campaign/model/User'
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