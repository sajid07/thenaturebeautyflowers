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
const slugify = require("slugify"); // Import the slugify library

router.post("/", authmiddleware, awsS3UploadMiddleware, async (req, res) => {
  try {
    // Create a new instance of the Product model
    const newProductData = req.body;

    // Generate slug based on product name
    const slug = slugify(newProductData.name, { lower: true }); // Lowercase and replace spaces with dashes

    // Check if the generated slug already exists in the database
    const existingProduct = await Product.findOne({ slug });
    if (existingProduct) {
      // If the slug already exists, append a random string to make it unique
      const randomString = Math.random().toString(36).substring(2, 7);
      newProductData.slug = `${slug}-${randomString}`;
    } else {
      // If the slug doesn't exist, use it as is
      newProductData.slug = slug;
    }

    // Create a new instance of the Product model with the updated slug
    const newProduct = new Product(newProductData);

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

// router.get("/:slug", mongooseValidationMiddleware, async (req, res) => {
router.get("/:slug", async (req, res) => {
  try {
    const { slug } = req.params;
    const product = await Product.findOne({ slug });

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Parse the features field
    console.log("in backend", product.features);
    if (typeof product.features === "string") {
      const trimmedFeatures = product.features.trim();
      if (trimmedFeatures !== "") {
        product.features = JSON.parse(trimmedFeatures);
      } else {
        product.features = ["No features available"]; // Provide a default message if features array is empty, null, or contains only whitespace
      }
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
      const { productId } = req.params;
      const { name, description, category, features } = req.body; // Include features in the request body

      const product = await Product.findById(productId);

      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }

      // Update product fields
      product.name = name;
      product.description = description;
      product.category = category;
      product.features = features; // Update features field

      // Generate slug if the product doesn't have one
      if (!product.slug) {
        const slug = slugify(name, { lower: true });
        // Check if the generated slug already exists in the database
        const existingProduct = await Product.findOne({ slug });
        if (existingProduct && existingProduct._id.toString() !== productId) {
          // If the slug already exists, append a random string to make it unique
          const randomString = Math.random().toString(36).substring(2, 7);
          product.slug = `${slug}-${randomString}`;
        } else {
          // If the slug doesn't exist, use it as is
          product.slug = slug;
        }
      }

      // Save the updated product to the database
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
