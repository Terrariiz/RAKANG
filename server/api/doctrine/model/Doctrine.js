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
  cloudinary_id: {
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
  ],
  count_api_namespace:{
    type: String
  },
  count_api_key:{
    type: String
  }

});



const Doctrine = mongoose.model("Doctrine", doctrineSchema);
module.exports = Doctrine;

