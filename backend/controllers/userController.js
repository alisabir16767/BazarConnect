const User = require("../models/User");
const { ExpressError, asyncWrap } = require("../middleware/errorMiddleware");

// Create a new user
exports.createUsers = asyncWrap(async (req, res, next) => {
  const { email, username } = req.body;

  // Check for existing user by email or username
  const existingUser = await User.findOne({ $or: [{ email }, { username }] });
  if (existingUser) {
    return next(new ExpressError(400, "Email or username already exists"));
  }

  // Create and save the new user
  const newUser = new User(req.body);
  await newUser.save();
  res.status(201).json({ message: "User created successfully", user: newUser });
});

// Get all users
exports.getAllUsers = asyncWrap(async (req, res) => {
  const users = await User.find().select("-password");
  res.status(200).json(users);
});

// Retrieve a specific user by userId
exports.getUserById = asyncWrap(async (req, res, next) => {
  const user = await User.findById(req.params.userId).select("-password");
  if (!user) {
    return next(new ExpressError(404, "User Not Found"));
  }
  res.status(200).json(user);
});

// Update an existing user by id
exports.updateUser = asyncWrap(async (req, res, next) => {
  const user = await User.findById(req.params.userId);
  if (!user) {
    return next(new ExpressError(404, "User Not Found"));
  }

  Object.keys(req.body).forEach((key) => {
    if (key !== "_id") user[key] = req.body[key];
  });

  await user.save();
  res.status(200).json({ message: "Updated successfully", user });
});

// Delete an existing user by id
exports.deleteUser = asyncWrap(async (req, res, next) => {
  const { userId } = req.params;
  const result = await User.findByIdAndDelete(userId);

  if (!result) {
    return next(new ExpressError(404, "User Not Found"));
  }

  res.status(200).json({ message: "User deleted successfully" });
});
