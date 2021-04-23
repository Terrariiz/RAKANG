const mongoose = require("mongoose");
const newSchema = new mongoose.Schema({
  name: {
    type: String
  },
  overviewimage: {
    type: String
  },
  galleryimage: [{
    type: String
  }],
  remain: {
    type: Number,
  },
  detail: {
    type: String,
  },
  cost: {
    type: Number,
  },
  status: {
    type: String
  }, 
  waitingorder: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ExchangeLog"
    }
  ],
  confirmorder: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ExchangeLog"
    }
  ],
  
});

const Exchange = mongoose.model("Exchange", newSchema);
module.exports = Exchange;