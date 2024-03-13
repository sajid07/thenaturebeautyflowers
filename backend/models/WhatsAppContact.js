// WhatsAppContact.js (Mongoose model)
const mongoose = require("mongoose");

const WhatsAppContactSchema = new mongoose.Schema({
  callContact: {
    type: String,
    required: true,
  },
  whatsappContact: {
    type: String,
    required: true,
  },
});

const WhatsAppContact = mongoose.model(
  "WhatsAppContact",
  WhatsAppContactSchema,
);

module.exports = WhatsAppContact;
