// socialLink.js

const express = require("express");
const router = express.Router();
const Link = require("../models/linkModel");

// Fetch links
router.get("/links", async (req, res) => {
  try {
    const links = await Link.findOne();
    res.json(links);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Update links
// Update links
router.put("/Update-links", async (req, res) => {
  console.log("PUT request received at /api/socialLink/Update-links");

  try {
    const updatedLinks = await Link.findOneAndUpdate({}, req.body.socialLinks, {
      new: true,
      upsert: true,
    });
    res.json(updatedLinks);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
