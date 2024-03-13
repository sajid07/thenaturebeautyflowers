// linkModel.js

const mongoose = require("mongoose");

const linkSchema = new mongoose.Schema({
  facebook: String,
  youtube: String,
  instagram: String,
  twitter: String,
  googleMap: String,
});

const Link = mongoose.model("Link", linkSchema);

module.exports = Link;
