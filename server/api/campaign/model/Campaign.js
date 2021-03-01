const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const CampaignSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  content: {
    type: String,
  },
  image: {
    type: String,
  },
  amount: {
    type: Number,
  },
  date: {
    type: String,
  },
  startdate: {
    type: Date,
  },
  donate: {
    type: Number
  },
  donatelist:[
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: "DonateLog"
    }
  ],
  location:{
    type: String,
  },
  overview:{
    type: String,
  },
  done:{
    type: String,
  },

 
});

// CampaignSchema.methods.percentage = async function(id) {
//   return (this.donate / this.amount)* 100
// };

const Campaign = mongoose.model("Campaign", CampaignSchema);
module.exports = Campaign;