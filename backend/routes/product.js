// // product.js under routes folder
// const express = require("express");
// const router = express.Router();
// const Product = require("../models/Product");
// var authmiddleware = require("../middleware/authMiddleware");

// // Use express.json() middleware to parse JSON requests
// router.use(express.json());

// // Add new product using: POST "/api/product" Auth required
// router.post("/", authmiddleware, async (req, res) => {
//   try {
//     console.log(req.body);

//     // Create a new instance of the Product model
//     const newProduct = new Product(req.body);

//     // Save the new product to the database
//     const savedProduct = await newProduct.save();

//     // Respond with the saved product
//     res.json(savedProduct);
//   } catch (error) {
//     console.error("Error creating Product:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
//   let products;

//   router.get("/fetchallproducts", async (req, res) => {
//     try {
//       // Access 'products' here
//       products = await Product.find();
//       res.json(products);
//     } catch (error) {
//       console.error(error);
//       res.status(500).send("Server Error");
//     }
//   });
// });

// router.delete("/:productId", async (req, res) => {
//   try {
//     const { productId } = req.params;

//     console.log(`Deleting product with ID: ${productId}`);

//     // Find the product by ID
//     const product = await Product.findById(productId);

//     if (!product) {
//       console.log(`Product not found with ID: ${productId}`);
//       return res.status(404).json({ message: "Product not found" });
//     }

//     // Delete the product
//     await product.deleteOne({ _id: productId });

//     console.log("Product deleted successfully");

//     res.json({ message: "Product deleted successfully" });
//   } catch (error) {
//     console.error("Error deleting product:", error);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// });
// router.put("/:productId", authmiddleware, async (req, res) => {
//   try {
//     const { productId } = req.params;
//     const { name, description, category } = req.body;

//     // Find the product by ID
//     const product = await Product.findById(productId);

//     if (!product) {
//       return res.status(404).json({ message: "Product not found" });
//     }

//     // Update the product fields
//     product.name = name;
//     product.description = description;
//     product.category = category;

//     // Save the updated product
//     await product.save();

//     console.log("Product updated successfully");

//     res.json({ message: "Product updated successfully" });
//   } catch (error) {
//     console.error("Error updating product:", error);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// });

// module.exports = router;
//updated code
const express = require('express');
const router = express.Router();
const Product = require("../models/Product");
const authmiddleware = require('../middleware/authMiddleware');

router.use(express.json());

// Add new product using: POST "/api/product" Auth required
router.post('/', authmiddleware, async (req, res) => {
  try {
    console.log(req.body);

    // Create a new instance of the Product model
    const newProduct = new Product(req.body);

    // Save the new product to the database
    const savedProduct = await newProduct.save();

    // Respond with the saved product
    res.json(savedProduct);
  } catch (error) {
    console.error('Error creating Product:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Fetch all products
router.get('/fetchallproducts', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

// Fetch a product by ID
router.get('/:productId', async (req, res) => {
  try {
    const { productId } = req.params;
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json(product);
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Delete a product by ID
router.delete('/:productId', async (req, res) => {
  try {
    const { productId } = req.params;
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    await product.deleteOne({ _id: productId });

    console.log('Product deleted successfully');

    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Update a product by ID
router.put('/:productId', authmiddleware, async (req, res) => {
  try {
    console.log("hi from product update")
    const { productId } = req.params;
    const { name, description, category } = req.body;

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    product.name = name;
    product.description = description;
    product.category = category;

    await product.save();

    console.log('Product updated successfully');

    res.json({ message: 'Product updated successfully' });
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;
