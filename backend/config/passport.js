const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/User");

passport.use(
  new LocalStrategy({ usernameField: "email" }, (email, password, done) => {
    User.findOne({ email }, (err, user) => {
      if (err) return done(err);
      if (!user) return done(null, false, { message: "Incorrect email." });

      // Use authenticate method provided by passport-local-mongoose
      user.authenticate(password, (err, user, options) => {
        if (err) return done(err);
        if (!user) return done(null, false, { message: options.message });
        return done(null, user);
      });
    });
  })
);

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
