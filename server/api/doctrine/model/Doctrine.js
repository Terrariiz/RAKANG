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
  },
  favby:[
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
  ]

});



const Doctrine = mongoose.model("Doctrine", doctrineSchema);
module.exports = Doctrine;

