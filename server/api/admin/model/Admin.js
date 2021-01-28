const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const adminSchema = new mongoose.Schema({
  username: {
    type: String,
  },
  password: {
    type: String,
  }
});

//this method will hash the password before saving the user model
// adminSchema.pre("save", async function(next) {
//   const admin = this;
//   if (admin.isModified("password")) {
//     admin.password = await bcrypt.hash(admin.password, 8);
//   }
//   next();
// });

//this method generates an auth token for the user
adminSchema.methods.generateAuthToken = async function() {
  const admin = this;
  const token = jwt.sign({ _id: admin._id, username: admin.username},
  "secret");
  // admin.tokens = admin.tokens.concat({ token });
  // await admin.save();
  return token;
};

//this method search for a user by email and password.
adminSchema.statics.findByCredentials = async (username, password) => {
  const admin = await Admin.findOne({username});
  if (!admin) {
    throw new Error({ error: "Invalid login details" });
  }
  const isPasswordMatch = await bcrypt.compare(password, admin.password);
  if (!isPasswordMatch) {
    throw new Error({ error: "Invalid login details" });
  }
  return admin;
};

const Admin = mongoose.model("Admin", adminSchema);
module.exports = Admin;