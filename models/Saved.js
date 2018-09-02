const mongoose = require("mongoose");

const savedSchema = new mongoose.Schema({
  userId: String,
  bid: Number,
  beer: {
    beer: {
      beer_abv: Number,
      beer_description: String,
      beer_label: String,
      beer_name: String,
      beer_style: String,
      bid: Number
    },
    brewery: {
      brewery_name: String
    }
  },
  rating: Number,
  comments: String
});

module.exports = mongoose.model("saved", savedSchema);
