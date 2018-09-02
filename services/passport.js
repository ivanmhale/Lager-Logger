const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
const LocalStrategy = require("passport-local").Strategy;
const mongoose = require("mongoose");
const keys = require("../config/keys");

const User = mongoose.model("users");

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then(user => done(null, user));
});

passport.use(
  new LocalStrategy((username, password, done) => {
    User.findOne({ userId: username }, (err, existingUser) => {
      // if (err) {
      //   done(err);
      // } else {
      //   if (existingUser) {
      //     var valid = existingUser.comparePassword(
      //       password,
      //       existingUser.password
      //     );
      //     if (valid) {
      //       done(null, existingUser);
      //     } else {
      //       return done(null, false, { message: "Invalid password" });
      //     }
      //   } else {
      //     return done(null, false, { message: "Incorrect username" });
      //   }
      // }
      console.log(profile);
    });
  })
);

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: "/auth/google/callback",
      proxy: true
    },
    async (accessToken, refreshToken, profile, done) => {
      // const existingUser = await User.findOne({ userId: profile.id });
      //
      // if (existingUser) {
      //   return done(null, existingUser);
      // }
      //
      // const user = await new User({
      //   userId: profile.id,
      //   name: profile.displayName,
      //   photo: profile.photos[0].value
      // }).save();
      //
      // done(null, user);
      console.log(profile);
    }
  )
);

passport.use(
  new FacebookStrategy(
    {
      clientID: keys.facebookAppId,
      clientSecret: keys.facebookAppSecret,
      callbackURL: "/auth/facebook/callback",
      profileFields: ["id", "displayName", "photos", "email"],
      proxy: true
    },
    (accessToken, refreshToken, profile, done) => {
      // User.findOne({ userId: profile.id }).then(existingUser => {
      //   if (existingUser) {
      //     done(null, existingUser);
      //   } else {
      //     new User({
      //       userId: profile.id,
      //       name: profile.displayName,
      //       photo: profile.photos[0].value
      //     })
      //       .save()
      //       .then(user => done(null, user));
      //   }
      // });
      console.log(profile);
    }
  )
);
