// user.js

const express = require('express');
const router = express.Router();
const authmiddleware =require('../Middleware/authMiddleware');
// Assuming you have a User model
const User = require('../models/User');

// GET user information
router.get('/user-info', authmiddleware, async (req, res) => {
  try {
    // Assuming your user ID is stored in req.user.id
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Send user information as a JSON response
    res.json({
      id: user._id,
      name: user.name,
      // Add other user fields as needed
    });
  } catch (error) {
    console.error(error);s
    res.status(500).send('Server Error');
  }
});

module.exports = router;
