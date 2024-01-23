// Product.js
const mongoose = require('mongoose');
const {schema}=require('mongoose')

const ProjectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  
  picture: {
    type: String, // Assuming you store the picture as a URL or file path
    required: true,
  },
  
});

const Product = mongoose.model('Project', ProjectSchema);

module.exports = Product;
