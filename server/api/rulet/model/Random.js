const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const randomSchema =  new mongoose.Schema({
    uid:{
      type: String
    },
    content: {
      type: String,
    },
  }, {timestamps: true});
  
  randomSchema.index({createdAt: 1},{expireAfterSeconds: 60});
  
  const Random = mongoose.model("Random", randomSchema);
  module.exports = Random;