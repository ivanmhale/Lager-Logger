const mongoose = require("mongoose");
const User = mongoose.model("users");

module.exports = (req, res, next) => {
  let { username, password } = req.body;

  User.findOne({ userId: username }, (err, existingUser) => {
    if (err) {
      res.send({ message: err });
    } else if (!existingUser) {
      res.send({ message: "Username not found" });
    } else if (existingUser) {
      var valid = existingUser.comparePassword(password, existingUser.password);
      if (!valid) {
        res.send({ message: "Invalid password" });
      }
      next();
    }
  });
};
