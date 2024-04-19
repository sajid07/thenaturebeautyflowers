//updated code
const express = require("express");
const router = express.Router();
const Product = require("../models/Product");
const authmiddleware = require("../Middleware/authMiddleware");
const {
  awsS3UploadMiddleware,
  awsS3DeleteMiddleware,
} = require("../Middleware/awsS3Middleware");
const mongooseValidationMiddleware = require("../Middleware/mongooseValidationMiddleware");

router.use(express.json());

// Add new product using: POST "/api/product" Auth required
router.post("/", authmiddleware, awsS3UploadMiddleware, async (req, res) => {
  try {
    // Create a new instance of the Product model
    const newProduct = new Product(req.body);

    // Save the new product to the database
    const savedProduct = await newProduct.save();

    // Respond with the saved product
    res.json(savedProduct);
  } catch (error) {
    console.error("Error creating Product:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Fetch all products
router.get("/fetchallproducts", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

// Fetch a product by ID
router.get("/:productId", mongooseValidationMiddleware, async (req, res) => {
  try {
    const { productId } = req.params;
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(product);
  } catch (error) {
    console.error("Error fetching product:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Delete a product by ID
router.delete(
  "/:productId",
  authmiddleware,
  mongooseValidationMiddleware,
  awsS3DeleteMiddleware,
  async (req, res) => {
    try {
      const { productId } = req.params;
      const product = await Product.findById(productId);

      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }

      await product.deleteOne({ _id: productId });

      console.log("Product deleted successfully");

      res.json({ message: "Product deleted successfully" });
    } catch (error) {
      console.error("Error deleting product:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
);
router.get("/category/:categoryValue", async (req, res) => {
  try {
    const { categoryValue } = req.params;
    console.log("categoryValue in backend we recieving", categoryValue);
    // Check if there are any products associated with the category
    const productCount = await Product.countDocuments({
      category: categoryValue,
    });
    console.log("productCount in backend we fetching", productCount);

    // Return a response indicating whether there are associated products or not
    res.json({ productCount: productCount });
  } catch (error) {
    console.error("Error checking if category has associated products:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Update a product by ID
router.put(
  "/:productId",
  authmiddleware,
  mongooseValidationMiddleware,
  async (req, res) => {
    try {
      console.log("hi from product update");
      const { productId } = req.params;
      const { name, description, category } = req.body;

      const product = await Product.findById(productId);

      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }

      product.name = name;
      product.description = description;
      product.category = category;

      await product.save();

      console.log("Product updated successfully");

      res.json({ message: "Product updated successfully" });
    } catch (error) {
      console.error("Error updating product:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
);

module.exports = router;
