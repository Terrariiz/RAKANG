const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  username:{
    type: String
  },
  firstname: {
    type: String,
  },
  lastname: {
    type: String,
  },
  phone: {
    type: String,
  },
  birthdate: {
    type: String,
  },
  image: {
    type: String,
  },
  Rank: {
    type: String,
  },
  Badge:{
    type: String,
  },
  tokens: [
    {
      token: {
        type: String,
        required: true
      }
    }
  ],
  resetPasswordToken: {
    type: String,
  },
  resetPasswordExpires: {
    type: String,
  },
  point:{
    type: Number
  },
  seamsi:{
    Playable: Boolean,
    Detail:  String
  },
  lantern:{
    Playable: Boolean,
    Detail:  String
  },
  
  donatelog:[
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: "DonateLog"
    }
  ],
  minigamelog:[
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: "MinigameLog"
    }
  ],
  favdoctrinelist:[
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Doctrine"
    }
  ],
});

//this method will hash the password before saving the user model
userSchema.pre("save", async function(next) {
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

//this method generates an auth token for the user
userSchema.methods.generateAuthToken = async function() {
  const user = this;
  const token = jwt.sign({ _id: user._id, name: user.name, email: user.email },
  "secret");
  user.tokens = user.tokens.concat({ token });
  await user.save();
  return token;
};

//get rank user
userSchema.methods.getrank = async function(id) {
    var item
    await User.find({},function(err, found){
      if(err){
        console.log(err);
      } else{
        found.sort(function(a, b){
          return b.point - a.point;
      });
      for(i = 0 ; i <= (found.length - 1) ; i++){
        if(found[i]._id == id){
          break
        }
      }
      item = i
      }
    })
    return i+1;
};

//this method search for a user by email and password.
userSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error({ error: "Invalid login details" });
  }
  const isPasswordMatch = await bcrypt.compare(password, user.password);
  if (!isPasswordMatch) {
    throw new Error({ error: "Invalid login details" });
  }
  return user;
};

//this method check old password and save new password.
userSchema.statics.checkPassword = async (id, oldPassword, newPassword) => {
  const user = await User.findById(id);
  const isPasswordMatch = await bcrypt.compare(oldPassword, user.password);
  if (!isPasswordMatch) {
    return "รหัสผ่านเดิมไม่ถูกต้อง";
  } else{
    user.password = newPassword;
    await user.save();
    return true;
  }
};
//เลื่อนระดับของ user เมื่อ point ถึงค่าที่กำหนด
userSchema.methods.ChangeRank =  function() {
  if(this.point >= 100000 && this.Rank != "Diamond"){
    this.Rank = "Diamond"
    this.Badge = "Diamond_Badge.png" 
    return "Daimond"
  } else if(this.point >= 30000 && this.Rank != "Platinum"){
    this.Rank = "Platinum"
    this.Badge = "Platinum_Badge.png"
    return "Platinum"
  } else if(this.point >= 10000 && this.Rank != "Gold"){
    this.Rank = "Gold"
    this.Badge = "Gold_Badge.png"
    return "Gold"
  } else if(this.point >= 5000 && this.Rank != "Sliver"){
    this.Rank = "Sliver"
    this.Badge = "Sliver_Badge.png"
    return "Sliver"
  } else if(this.point >= 0 && this.Rank != "Bronze"){
    this.Rank = "Bronze"
    this.Badge = "Bronze_Badge.png"
    return "Bronze"
  }
  return false
}

userSchema.methods.CheckFav = async function(campaign) {
  
  var thisfav = false
  for(var i ; i < this.favdoctrinelist.length  ; i++){
    if(this.favdoctrinelist[i].equals(campaign)){
      thisfav = true;
      break;
    }
  }
  if(thisfav == false){
    user.favdoctrinelist.push(campaign);
    user.save();
  }
  return thisfav;
};

const User = mongoose.model("User", userSchema);
module.exports = User;