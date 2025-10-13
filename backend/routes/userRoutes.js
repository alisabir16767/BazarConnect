import express from "express";
import passport from "passport";
import {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} from "../controllers/userController.js"; // Named imports

import { ensureAuthenticated } from "../middleware/authMiddleware.js"; // optional middleware

const router = express.Router();

// LOGIN CHECKER
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

// LOGIN ROUTE
router.post("/login", passport.authenticate("local"), (req, res) => {
  res.status(200).json({ message: "Logged in successfully", user: req.user });
});

// LOGOUT ROUTE
router.get("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);
    res.status(200).json({ message: "Logged out successfully" });
  });
});

// USER ROUTES
router.post("/", createUser);
router.get("/", getAllUsers);
router.get("/:userId", getUserById);
router.put("/:userId", updateUser);
router.delete("/:userId", deleteUser);

export default router;
