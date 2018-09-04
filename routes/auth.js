const passport = require("passport");
const mongoose = require("mongoose");
const User = mongoose.model("users");
const SignIn = require("../middlewares/SignIn");

module.exports = app => {
  app.post("/auth/signup", (req, res) => {
    const { username, password } = req.body;
    User.findOne({ userId: username }, (err, doc) => {
      if (err) {
        res.send({ message: "error occured" });
      } else {
        if (doc) {
          res.send({ message: "Username already in use" });
        } else {
          var newUser = new User({
            userId: username,
            name: username
          });
          newUser.password = newUser.hashPassword(password);
          newUser.save((err, user) => {
            if (err) {
              res.send("Database error");
            }
            res.send(user);
          });
        }
      }
    });
  });

  app.post("/auth/init", SignIn, passport.authenticate("local"), (req, res) => {
    res.send(req.user);
  });

  app.post("/auth/login", passport.authenticate("local"), (req, res) => {
    res.send(req.user);
  });

  app.get(
    "/auth/google",
    passport.authenticate("google", { scope: ["profile", "email"] })
  );

  app.get("/auth/facebook", passport.authenticate("facebook"));

  app.get(
    "/auth/google/callback",
    passport.authenticate("google"),
    (req, res) => {
      res.redirect("/profile");
    }
  );

  app.get(
    "/auth/facebook/callback",
    passport.authenticate("facebook"),
    (req, res) => {
      res.redirect("/profile");
    }
  );

  app.get("/auth/logout", (req, res) => {
    req.logout();
    res.redirect("/");
  });

  app.get("/auth/user", (req, res) => {
    if (!req.user) {
      return res.send({});
    }
    res.send(req.user);
  });
};
