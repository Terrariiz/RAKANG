const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userSchema = new mongoose.Schema({
  username: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
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
  tokens: [
    {
      token: {
        type: String,
        required: true
      }
    }
  ],
  coin: {
    type: Number
  },
  donatelog:[
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: "DonateLog"
    }
  ],
  coinlog:[
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: "CoinLog"
    }
  ],
  minigamelog:[
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: "MinigameLog"
    }
  ]
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
    throw new Error({ error: "รหัสผ่านเดิมไม่ถูกต้อง" });
  } else{
    user.password = newPassword;
    await user.save();
    return true;
  }
};

const User = mongoose.model("User", userSchema);
module.exports = User;