const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema({
  name: { type: String, unique: true },
  value: String,
  picture_url: String,
});

const Category = mongoose.model("Category", CategorySchema, "categories");

module.exports = Category;
