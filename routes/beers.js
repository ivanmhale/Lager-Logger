const fetch = require("node-fetch");
const { untapptdClientID, untapptdClientSecret } = require("../config/keys");
const several = require("../seed/several.json");
const mongoose = require("mongoose");
const Saved = mongoose.model("saved");
const clearCache = require("../middlewares/clearCache");

module.exports = app => {
  app.get("/search/:term", (req, res) => {
    const term = req.params.term;
    let dataArray = [];

    function pushFromResponseToLocalArray(responseArray) {
      for (let item of responseArray) {
        dataArray.push(item);
      }
    }

    fetch(
      "https://api.untappd.com/v4/search/beer?q=" +
        term +
        "&sort=name&client_id=" +
        untapptdClientID +
        "&client_secret=" +
        untapptdClientSecret
    )
      .then(res => res.json())
      .then(parsed => pushFromResponseToLocalArray(parsed.response.beers.items))
      .then(() => res.send(dataArray))
      .catch(err => console.log(err));
  });

  app.post("/user/beers", clearCache, (req, res) => {
    let { userId, bid, beer, rating, comments } = req.body;

    Saved.findOne({ userId, bid }).then(existingSaved => {
      if (existingSaved) {
        return;
      } else {
        new Saved({
          userId,
          bid,
          beer,
          rating,
          comments
        }).save();
      }
    });
  });

  app.get("/user/beers", async (req, res) => {
    const beers = await Saved.find({ userId: req.user.userId })
        .cache({key: req.user.userId});
    res.send(beers);
  });

  app.patch("/user/beers", async (req, res) => {
    const { userId, bid, rating, comments } = req.body;
    Saved.updateOne({ userId, bid }, { rating, comments }, (err, response) => {
      if (err) throw err;
      res.send(response);
    });
  });

  app.delete("/user/beers", async (req, res) => {
    const { userId, bid } = req.body;
    Saved.findOneAndDelete({ userId, bid }, doc => {
      console.log("Document found and deleted");
    });
  });
};
