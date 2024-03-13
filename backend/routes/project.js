const express = require("express");
const router = express.Router();
const Project = require("../models/Projects");
const authmiddleware = require("../middleware/authMiddleware");

router.use(express.json());

// Add new product using: POST "/api/product" Auth required
router.post("/", authmiddleware, async (req, res) => {
  try {
    console.log(req.body);

    // Create a new instance of the Product model
    const newProject = new Project(req.body);

    // Save the new product to the database
    const savedProject = await newProject.save();

    // Respond with the saved product
    res.json(savedProject);
  } catch (error) {
    console.error("Error creating Project:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Fetch all Projects
router.get("/fetchallprojects", async (req, res) => {
  try {
    // Assuming Project is your Mongoose model for projects
    const projects = await Project.find();
    res.json(projects);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

// Fetch a product by ID
router.get("/:projectId", async (req, res) => {
  try {
    const { projectId } = req.params;
    const project = await projects.findById(projectId);

    if (!project) {
      return res.status(404).json({ message: "project not found" });
    }

    res.json(project);
  } catch (error) {
    console.error("Error fetching project:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Delete a product by ID
router.delete("/:projectId", async (req, res) => {
  try {
    const { projectId } = req.params;
    const project = await Product.findById(projectId);

    if (!project) {
      return res.status(404).json({ message: "project not found" });
    }

    await projects.deleteOne({ _id: projectId });

    console.log("Project deleted successfully");

    res.json({ message: "Project deleted successfully" });
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});
router.delete("/projects/:projectId", async (req, res) => {
  const { projectId } = req.params;
  console.log("hi from delete section");
  try {
    const deletedProject = await Project.findByIdAndDelete(projectId);

    if (!deletedProject) {
      return res.status(404).json({ error: "Project not found" });
    }

    res.json({ message: "Project deleted successfully" });
  } catch (error) {
    console.error("Error deleting project:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Update a product by ID
// router.put('/:productId', authmiddleware, async (req, res) => {
//   try {
//     const { productId } = req.params;
//     const { name, description, category } = req.body;

//     const product = await Product.findById(productId);

//     if (!product) {
//       return res.status(404).json({ message: 'Product not found' });
//     }

//     product.name = name;
//     product.description = description;
//     product.category = category;

//     await product.save();

//     console.log('Product updated successfully');

//     res.json({ message: 'Product updated successfully' });
//   } catch (error) {
//     console.error('Error updating product:', error);
//     res.status(500).json({ message: 'Internal Server Error' });
//   }
// });

module.exports = router;
