const mongoose = require("mongoose");
const doctrineSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  content: {
    type: String,
  },
  image: {
    type: String,
  },
  edittime: {
    type: Date,
  },
  categories:{
    type: String
  }

});

const Doctrine = mongoose.model("Doctrine", doctrineSchema);
module.exports = Doctrine;

