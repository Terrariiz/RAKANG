const mongoose = require("mongoose");
const newSchema = new mongoose.Schema({
  
    item:
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Exchange'
    }
    ,
    user:  
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    locationdetail:  
    {
        type: String,
    },
    District: 
    {
        type: String,
    },
    Sub_District: 
    {
        type: String,
    },
    province: 
    {
        type: String,
    },
    postcode: 
    {
        type: String,
    },
 
});

const ExchanceLog = mongoose.model("ExchanceLog", newSchema);
module.exports = ExchanceLog;