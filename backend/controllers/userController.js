const User = require("../models/User");
const { ExpressError, asyncWrap } = require("../middleware/errorMiddleware");
const { validationResult } = require("express-validator");

// Create a new user
exports.createUser = asyncWrap(async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new ExpressError(400, errors.array()[0].msg));
  }

  const { email, username } = req.body;

  // Check for existing user (case insensitive)
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

    // Remove sensitive data before sending response
    const userObj = newUser.toObject();
    delete userObj.hash;
    delete userObj.salt;

    res.status(201).json({
      success: true,
      message: "User created successfully",
      user: userObj,
    });
  } catch (err) {
    next(new ExpressError(400, err.message));
  }
});

// Get all users (admin only)
exports.getAllUsers = asyncWrap(async (req, res, next) => {
  // Check if user is admin
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

// Get user by ID
exports.getUserById = asyncWrap(async (req, res, next) => {
  const user = await User.findById(req.params.userId).select(
    "-hash -salt -loginAttempts"
  );

  if (!user) {
    return next(new ExpressError(404, "User not found"));
  }

  // Users can only access their own profile unless admin
  if (req.user.role !== "admin" && req.user.id !== req.params.userId) {
    return next(new ExpressError(403, "Unauthorized access"));
  }

  res.status(200).json({
    success: true,
    user,
  });
});

// Update user
exports.updateUser = asyncWrap(async (req, res, next) => {
  const user = await User.findById(req.params.userId);

  if (!user) {
    return next(new ExpressError(404, "User not found"));
  }

  // Users can only update their own profile unless admin
  if (req.user.role !== "admin" && req.user.id !== req.params.userId) {
    return next(new ExpressError(403, "Unauthorized access"));
  }

  // Prevent role changes unless admin
  if (req.body.role && req.user.role !== "admin") {
    return next(new ExpressError(403, "Only admins can change user roles"));
  }

  // Update fields
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

// Delete user
exports.deleteUser = asyncWrap(async (req, res, next) => {
  const user = await User.findById(req.params.userId);

  if (!user) {
    return next(new ExpressError(404, "User not found"));
  }

  // Users can only delete their own account unless admin
  if (req.user.role !== "admin" && req.user.id !== req.params.userId) {
    return next(new ExpressError(403, "Unauthorized access"));
  }

  await user.remove();

  res.status(200).json({
    success: true,
    message: "User deleted successfully",
  });
});

// Get current user profile
exports.getCurrentUser = asyncWrap(async (req, res) => {
  const user = await User.findById(req.user.id).select(
    "-hash -salt -loginAttempts"
  );

  res.status(200).json({
    success: true,
    user,
  });
});
