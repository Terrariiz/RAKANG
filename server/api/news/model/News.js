const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const newSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  content: {
    type: String,
  },
  image: {
    type: String,
  },
  cloudinary_id: {
    type: String,
  },
  date: {
    type: Date
  },
  categories:{
    type: String
  },
 
});



const News = mongoose.model("News", newSchema);
module.exports = News;