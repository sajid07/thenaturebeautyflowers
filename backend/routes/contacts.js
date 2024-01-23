// routes/contacts.js
const express = require('express');
const router = express.Router();
const WhatsAppContact = require('../models/WhatsAppContact');

// Get both call and WhatsApp contacts
router.get('/contacts', async (req, res) => {
  try {
    const contacts = await WhatsAppContact.findOne();
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update both call and WhatsApp contacts
router.put('/update-contacts', async (req, res) => {
    try {
      const updatedContacts = await WhatsAppContact.findOneAndUpdate(
        {},
        req.body,
        { new: true, upsert: true }
      );
      res.json(updatedContacts);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  

module.exports = router;
