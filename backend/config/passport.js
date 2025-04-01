const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/User");

const customFields = {
  usernameField: "email",
  passReqToCallback: true,
};

const verifyCallback = async (req, email, password, done) => {
  try {
    const user = await User.findOne({
      email: { $regex: new RegExp(`^${email}$`, "i") },
    });

    if (!user) {
      return done(null, false, {
        message: "Incorrect email or password",
        status: 401,
      });
    }

    const isMatch = await new Promise((resolve, reject) => {
      user.authenticate(password, (err, user, options) => {
        if (err) return reject(err);
        resolve(user ? true : false);
      });
    });

    if (!isMatch) {
      return done(null, false, {
        message: "Incorrect email or password",
        status: 401,
      });
    }

    return done(null, user);
  } catch (err) {
    return done(err);
  }
};

// Export function to initialize passport strategies
module.exports = function (passport) {
  passport.use(new LocalStrategy(customFields, verifyCallback));

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findById(id);
      done(null, user);
    } catch (err) {
      done(err);
    }
  });
};
