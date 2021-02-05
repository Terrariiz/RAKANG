const mongoose = require("mongoose");
const newSchema = new mongoose.Schema({
  user:[
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: '../../user/model/User'
  }
],
  amount: {
    type: String,
  },
  date: {
    type: Date,
  },
 
});

const CoinLog = mongoose.model("CoinLog", newSchema);
module.exports = CoinLog;