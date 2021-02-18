const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const newSchema = new mongoose.Schema({
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
    type: String,
  },
  date: {
    type: Date,
  },
  donate: {
    type: Number
  },
  donatelist:[
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: "../../log/model/DonateLog"
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



const Campaign = mongoose.model("Campaign", newSchema);
module.exports = Campaign;