const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken"); // Import JWT
const User = require("../models/User"); // Import your User model
const { body, validationResult } = require("express-validator");
var authmiddleware = require("../Middleware/authMiddleware");
const { generateResetToken } = require("../utils/resetToken");
const sendResetEmail = require("../email"); // Import the sendResetEmail function

// Secret key for JWT (you should store this securely and not hardcode it)
const JWT_SECRET = process.env.REACT_APP_AWS_SECRET_ACCESS_KEY;

// Route to create a new user with hashed password
// ROUTE 1: Create a User using: POST "/api/auth/createuser". No login required
router.post(
  "/createuser",
  [
    body("name", "Enter a valid name").isLength({ min: 3 }),
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password must be at least 5 characters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    // If there are errors, return Bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      // Check whether the user with this email exists already
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res
          .status(400)
          .json({ error: "Sorry, a user with this email already exists" });
      }
      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt);

      // Create a new user
      user = await User.create({
        name: req.body.name,
        password: secPass,
        email: req.body.email,
      });
      const data = {
        user: {
          id: user.id,
        },
      };
      const authtoken = jwt.sign(data, JWT_SECRET);

      const success = true;
      res.json({ success, authtoken });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);

// ROUTE 2: Authenticate a User using: POST "/api/auth/login". No login required
router.post(
  "/login",
  [
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password cannot be blank").exists(),
  ],
  async (req, res) => {
    // If there are errors, return Bad request and the errors
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res
          .status(400)
          .json({ error: "Please try to login with correct credentials" });
      }

      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        return res.status(400).json({
          success,
          error: "Please try to login with correct credentials",
        });
      }

      const data = {
        user: {
          id: user.id,
        },
      };
      const authtoken = jwt.sign(data, JWT_SECRET);
      success = true;

      // Log the authentication token and success status
      console.log("Authentication Token:", authtoken);
      console.log("Success:", success);

      res.json({ authtoken, success });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);

// ROUTE 3: Get logged-in User Details using: POST "/api/auth/getuser". Login required
router.post("/getuser", authmiddleware, async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    res.send(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});
//password request function
router.post("/reset-password", async (req, res) => {
  const { email } = req.body;

  try {
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Generate and save reset token for the user
    const resetToken = generateResetToken();
    user.resetToken = resetToken;
    await user.save();

    // Send email with reset token
    await sendResetEmail(email, resetToken);

    res.json({ message: "Reset token generated and emailed to user" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});
// Endpoint to handle password reset
router.post("/reset-password-form", async (req, res) => {
  const { resetToken, newPassword } = req.body;

  try {
    // Find user by token and verify token validity
    const user = await User.findOne({
      resetToken: resetToken,
      // resetTokenExpiry: { $gt: Date.now() },
    });
    console.log("user to be changed", user);
    if (!user) {
      return res.status(400).json({ error: "Invalid or expired token" });
    }
    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(newPassword, salt);
    // Update user's password
    user.password = secPass;
    user.resetToken = undefined;
    // user.resetTokenExpiry = undefined;
    await user.save();

    // Send success response
    return res.status(200).json({ message: "Password reset successfully" });
  } catch (error) {
    console.error("Error resetting password:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});
module.exports = router;
