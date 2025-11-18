const express = require("express");
const {
  signupUser,
  loginUser,
  getUserProfile,
  editUserProfile,
  deleteUser
} = require("../controller/userController");

const requireAuth = require("../middleware/requireAuth");

const router = express.Router();

// -------------------- AUTH ROUTES --------------------

// login route
router.post("/login", loginUser);

// signup route 
router.post("/signup", signupUser);

// -------------------- USER ROUTES --------------------

// get logged-in user profile
router.get("/profile", requireAuth, getUserProfile);

// edit user profile 
router.put("/profile", requireAuth, editUserProfile);

// DELETE USER PROFILE (protected)
router.delete('/profile', requireAuth, deleteUser);

module.exports = router;
