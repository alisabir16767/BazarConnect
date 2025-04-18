const User = require("../models/User");
const { ExpressError, asyncWrap } = require("../middleware/errorMiddleware");
const { validationResult } = require("express-validator");
const passport = require("passport");

// CREATE USER
exports.createUser = asyncWrap(async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new ExpressError(400, errors.array()[0].msg));
  }

  const { email, username } = req.body;
  const existingUser = await User.findOne({
    $or: [
      { email: { $regex: new RegExp(`^${email}$`, "i") } },
      { username: { $regex: new RegExp(`^${username}$`, "i") } },
    ],
  });

  if (existingUser) {
    return next(new ExpressError(400, "Email or username already exists"));
  }

  try {
    const newUser = await User.register(new User(req.body), req.body.password);

    req.login(newUser, (err) => {
      if (err)
        return next(new ExpressError(500, "Login after registration failed"));

      const userObj = newUser.toObject();
      delete userObj.hash;
      delete userObj.salt;

      res.status(201).json({
        success: true,
        message: "User registered and logged in successfully",
        user: userObj,
      });
    });
  } catch (err) {
    next(new ExpressError(400, err.message));
  }
});

// GET ALL USERS
exports.getAllUsers = asyncWrap(async (req, res, next) => {
  if (req.user.role !== "admin") {
    return next(new ExpressError(403, "Unauthorized access"));
  }

  const users = await User.find().select("-hash -salt -loginAttempts");
  res.status(200).json({
    success: true,
    count: users.length,
    users,
  });
});

// GET USER BY ID
exports.getUserById = asyncWrap(async (req, res, next) => {
  const user = await User.findById(req.params.userId).select(
    "-hash -salt -loginAttempts"
  );

  if (!user) {
    return next(new ExpressError(404, "User not found"));
  }

  if (req.user.role !== "admin" && req.user.id !== req.params.userId) {
    return next(new ExpressError(403, "Unauthorized access"));
  }

  res.status(200).json({
    success: true,
    user,
  });
});

// UPDATE USER
exports.updateUser = asyncWrap(async (req, res, next) => {
  const user = await User.findById(req.params.userId);

  if (!user) {
    return next(new ExpressError(404, "User not found"));
  }

  if (req.user.role !== "admin" && req.user.id !== req.params.userId) {
    return next(new ExpressError(403, "Unauthorized access"));
  }
  if (req.body.role && req.user.role !== "admin") {
    return next(new ExpressError(403, "Only admins can change user roles"));
  }
  const updatableFields = [
    "name",
    "address",
    "city",
    "state",
    "country",
    "zip_code",
  ];
  if (req.user.role === "admin") {
    updatableFields.push("role", "isVerified", "isLocked");
  }

  updatableFields.forEach((field) => {
    if (req.body[field] !== undefined) {
      user[field] = req.body[field];
    }
  });

  await user.save();

  const userObj = user.toObject();
  delete userObj.hash;
  delete userObj.salt;

  res.status(200).json({
    success: true,
    message: "User updated successfully",
    user: userObj,
  });
});

// DELETE USER
exports.deleteUser = asyncWrap(async (req, res, next) => {
  const user = await User.findById(req.params.userId);

  if (!user) {
    return next(new ExpressError(404, "User not found"));
  }

  if (req.user.role !== "admin" && req.user.id !== req.params.userId) {
    return next(new ExpressError(403, "Unauthorized access"));
  }

  await user.remove();

  res.status(200).json({
    success: true,
    message: "User deleted successfully",
  });
});

exports.getCurrentUser = asyncWrap(async (req, res) => {
  const user = await User.findById(req.user.id).select(
    "-hash -salt -loginAttempts"
  );

  res.status(200).json({
    success: true,
    user,
  });
});
