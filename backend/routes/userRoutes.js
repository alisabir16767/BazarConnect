const express = require("express");
const passport = require("passport");
const userController = require("../controllers/userController");

const router = express.Router();

router.post("/login", passport.authenticate("local"), (req, res) => {
  res.status(200).json({ message: "Logged in successfully", user: req.user });
});

router.get("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);
    res.status(200).json({ message: "Logged out successfully" });
  });
});

router.post("/", userController.createUser);
router.get("/", userController.getAllUsers);
router.get("/:userId", userController.getUserById);
router.put("/:userId", userController.updateUser);
router.delete("/:userId", userController.deleteUser);

module.exports = router;
