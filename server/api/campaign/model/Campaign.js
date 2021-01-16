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
    type: String,
  },
 
});



const Campaign = mongoose.model("Campaign", newSchema);
module.exports = Campaign;