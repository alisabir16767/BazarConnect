const User = require("../models/User");
const passport = require("passport"); // Add this
const { asyncWrap } = require("../middleware/errorMiddleware");

exports.register = asyncWrap(async (req, res, next) => {
  const { email, username, password, ...userData } = req.body;

  const user = new User({ email, username, ...userData });
  const registeredUser = await User.register(user, password);

  req.login(registeredUser, (err) => {
    if (err) return next(err);

    const userResponse = registeredUser.toObject();
    delete userResponse.hash;
    delete userResponse.salt;

    res.status(201).json({
      success: true,
      user: userResponse,
    });
  });
});

exports.login = asyncWrap(async (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) return next(err);
    if (!user) {
      return res.status(info?.status || 401).json({
        success: false,
        message: info?.message || "Invalid credentials",
      });
    }

    req.logIn(user, (err) => {
      if (err) return next(err);

      const userResponse = user.toObject();
      delete userResponse.hash;
      delete userResponse.salt;

      return res.json({
        success: true,
        user: userResponse,
      });
    });
  })(req, res, next);
});

exports.logout = (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);
    res.json({ success: true, message: "Logged out successfully" });
  });
};

exports.getCurrentUser = (req, res) => {
  if (!req.user) {
    return res
      .status(401)
      .json({ success: false, message: "Not authenticated" });
  }

  const userResponse = req.user.toObject();
  delete userResponse.hash;
  delete userResponse.salt;

  res.json({ success: true, user: userResponse });
};
