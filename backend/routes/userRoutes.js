const express = require("express");
const passport = require("passport");
const userController = require("../controllers/userController");

// LOGIN CHECKER
const router = express.Router();
router.get("/isAuthenticated", (req, res) => {
  console.log("Session ID:", req.sessionID);
  console.log("Session object:", req.session);
  console.log("User:", req.user);
  if (req.isAuthenticated()) {
    return res.status(200).json({
      loggedIn: true,
      user: req.user,
      sessionID: req.sessionID,
    });
  }
  return res.status(401).json({ loggedIn: false });
});

//LOGIN ROUTE
router.post("/login", passport.authenticate("local"), (req, res) => {
  res.status(200).json({ message: "Logged in successfully", user: req.user });
});

// LOGOUT ROUTE
// LOGOUT ROUTE
router.get("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);

    req.session.destroy((err) => {
      if (err) {
        console.error("Session destroy error:", err);
        return res.status(500).json({ message: "Logout failed" });
      }

      res.clearCookie("connect.sid", {
        path: "/",
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
      });

      return res.status(200).json({ message: "Logged out successfully" });
    });
  });
});

router.post("/", userController.createUser);
router.get("/", userController.getAllUsers);
router.get("/:userId", userController.getUserById);
router.put("/:userId", userController.updateUser);
router.delete("/:userId", userController.deleteUser);

module.exports = router;
