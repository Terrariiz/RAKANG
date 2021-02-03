const mongoose = require("mongoose");
const newSchema = new mongoose.Schema({
  Minigame: {
    name: String
  },
  user: {
    id:{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Campaign'
    },
    username: String
  },
  amount: {
    type: String,
  },
  date: {
    type: Date,
  },
 
});

const Campaign = mongoose.model("MinigameLog", newSchema);
module.exports = Campaign;