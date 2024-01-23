// Product.js
const mongoose = require('mongoose');
const {schema}=require('mongoose')

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  picture: {
    type: String, // Assuming you store the picture as a URL or file path
    required: true,
  },
  pdfFile: {
    type: String, // Assuming you store the PDF file as a URL or file path
    required: true,
  },
});

const Product = mongoose.model('Product', ProductSchema);

module.exports = Product;
