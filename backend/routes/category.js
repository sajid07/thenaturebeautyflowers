const express = require("express");
const router = express.Router();
const Category = require("../models/Category");
const authmiddleware = require("../Middleware/authMiddleware");
const {
  awsS3UploadMiddleware,
  awsS3DeleteMiddleware,
} = require("../Middleware/awsS3Middleware");
const mongooseValidationMiddleware = require("../Middleware/mongooseValidationMiddleware");
// Get all categories
router.get("/category", async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Add a new category (Auth required)
router.post("/", authmiddleware, awsS3UploadMiddleware, async (req, res) => {
  try {
    // Check if req.body.name exists and is not undefined
    if (!req.body.name) {
      return res.status(400).json({ error: "Category name is required" });
    }

    // Check if the category already exists
    const existingCategory = await Category.findOne({ name: req.body.name });
    console.log("existing category", existingCategory);

    if (existingCategory) {
      return res.status(400).json({ error: "Category already exists" });
    }
    // Create a new category object
    const newCategory = new Category({
      name: req.body.name,
      value: req.body.name
        .replace(/[^\w\s]/g, "-")
        .toLowerCase()
        .replace(/\s+/g, "-"),
      picture_url: req.body.picture, // Assuming picture_url is also in the request body
    });

    // Save the new category to the database
    const savedCategory = await newCategory.save();

    // Respond with the saved category
    res.json(savedCategory);
  } catch (error) {
    console.error("Error creating Category:", error);
    res.status(500).json({ error: error.message });
  }
});
router.get("/exists", authmiddleware, async (req, res) => {
  try {
    const { name } = req.query;

    if (!name) {
      return res.status(400).json({ error: "Category name is required" });
    }

    // Check if the category with the given name exists
    const existingCategory = await Category.findOne({ name });

    // If category exists, return exists:true, otherwise return exists:false
    res.json({ exists: !!existingCategory });
  } catch (error) {
    console.error("Error checking category existence:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.delete(
  "/category/:categoryId",
  authmiddleware,
  awsS3DeleteMiddleware,
  async (req, res) => {
    try {
      // Find the category by ID and delete it
      await Category.findByIdAndDelete(req.params.categoryId);
      res
        .status(200)
        .json({ success: true, message: "Category deleted successfully" });
    } catch (error) {
      console.error("Error deleting category:", error);
      res
        .status(500)
        .json({ success: false, message: "Error deleting category" });
    }
  }
);
router.put(
  "/category/:categoryId",

  awsS3DeleteMiddleware, // Delete old picture from S3 first
  awsS3UploadMiddleware, // Middleware for deleting old picture from S3
  async (req, res) => {
    console.log("welcome to the backend first");

    try {
      console.log("welcome to the backend");
      const { name, picture } = req.body;

      // Check if req.body.name exists and is not undefined
      if (!name) {
        return res.status(400).json({ error: "Category name is required" });
      }

      // Find the category by ID
      const category = await Category.findById(req.params.categoryId);

      // If category not found, return error
      if (!category) {
        return res.status(404).json({ error: "Category not found" });
      }

      // Update the category fields
      category.name = name;
      category.value = name
        .replace(/[^\w\s]/g, "-")
        .toLowerCase()
        .replace(/\s+/g, "-");
      category.picture_url = picture; // Assuming picture_url is in the request body

      // Save the updated category to the database
      const updatedCategory = await category.save();

      // Respond with the updated category
      res.json(updatedCategory);
    } catch (error) {
      console.error("Error updating category:", error);
      res.status(500).json({ error: error.message });
    }
  }
);
module.exports = router;
