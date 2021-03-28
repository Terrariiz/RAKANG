const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const ruletSchema = new mongoose.Schema({
  CNumber: {
    type: String,
  },
  content: {
    type: String,
  },
});



const Rulet = mongoose.model("Rulet", ruletSchema);
module.exports = Rulet;