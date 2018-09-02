const mongoose = require("mongoose");
const bcrypt = require("bcrypt-nodejs");

const userSchema = new mongoose.Schema({
  userId: String,
  password: {
    type: String,
    required: false
  },
  name: String,
  photo: String
});

userSchema.methods.hashPassword = password => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};

userSchema.methods.comparePassword = (password, hash) => {
  return bcrypt.compareSync(password, hash);
};

module.exports = mongoose.model("users", userSchema);
