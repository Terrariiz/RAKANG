const mongoose = require("mongoose");
const newSchema = new mongoose.Schema({
  name: {
    type: String
  },
  overviewimage: {
    type: String
  },
  galleryimage: [{
      image: String,
      cloudinary_id:  String
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
  cloudinary_id: {
    type: String,
  },

  
});




const Exchange = mongoose.model("Exchange", newSchema);
module.exports = Exchange;