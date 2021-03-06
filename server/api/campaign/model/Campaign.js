const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
// const moment = require('moment');
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
  status: {
    type : String,
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
  categories:{
    type: String
  },

 
});

CampaignSchema.methods.expired  = function() {
  console.log('function')  
    var expried_date = moment(this.date).format("DD-MM-YY");
    var now = new Date().toISOString().substr(0, 10);
    var result;
    now = moment(now).format("DD-MM-YY");
  if(expried_date == now || expried_date < now){
    console.log('1')
    result = 'yes';
    return result
  }else{
    result = 'no';
    return result
  }

};

const Campaign = mongoose.model("Campaign", CampaignSchema);
module.exports = Campaign;