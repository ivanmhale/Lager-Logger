const express = require("express");
// const mongoose = require("mongoose");
 const keys = require("./config/keys");
// const cookieSession = require("cookie-session");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: "/auth/google/callback",
      proxy: true
    },
    async (accessToken, refreshToken, profile, done) => {
      console.log(profile);
    }
  )
);
// const bodyParser = require("body-parser");

// require("./models/User");
// require("./models/Saved");
// require("./services/passport");
//
// mongoose.connect(keys.mongoURI);
//
const app = express();
//
// app.use(bodyParser.json());
// app.use(
//   cookieSession({
//     maxAge: 24 * 60 * 60 * 1000,
//     keys: [keys.cookieKey]
//   })
// );
// app.use(passport.initialize());
// app.use(passport.session());
//
// const path = require("path");
//

// require("./routes/beers")(app);

app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google"),
  (req, res) => {
    res.redirect("/profile");
  }
);

if (process.env.NODE_ENV === "production") {
  require("./routes/auth")(app);

  app.use(express.static(path.join(__dirname, "client/build")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname + "/client/build/index.html"));
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT);
