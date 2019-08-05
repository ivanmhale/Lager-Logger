const mongoose = require("mongoose");
const User = mongoose.model("users");

module.exports = () => {
    return new User({userId:696969, name: "John Doe"}).save();
};