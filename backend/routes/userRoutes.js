const express = require("express");
const passport = require("passport");
const userController = require("../controllers/userController");

const router = express.Router();

// User CRUD routes
router.post("/", userController.createUser);
router.get("/", userController.getAllUsers);
router.get("/:userId", userController.getUserById);
router.put("/:userId", userController.updateUser);
router.delete("/:userId", userController.deleteUser);

// Login route
router.post("/login", passport.authenticate("local"), (req, res) => {
  res.status(200).json({ message: "Logged in successfully", user: req.user });
});

// Logout route
router.get("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);
    res.status(200).json({ message: "Logged out successfully" });
  });
});

module.exports = router;
