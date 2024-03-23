const express = require("express");
const router = express.Router();
const Project = require("../models/Project");
const authmiddleware = require("../Middleware/authMiddleware");
const {
  awsS3UploadMiddleware,
  awsS3DeleteMiddleware,
} = require("../Middleware/awsS3Middleware");

router.use(express.json());

// Add new product using: POST "/api/product" Auth required
router.post("/", authmiddleware, awsS3UploadMiddleware, async (req, res) => {
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
    const project = await Project.findById(projectId);

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
router.delete(
  "/:projectId",
  authmiddleware,
  awsS3DeleteMiddleware,
  async (req, res) => {
    try {
      const { projectId } = req.params;
      const project = await Project.findById(projectId);

      if (!project) {
        return res.status(404).json({ message: "project not found" });
      }

      await Project.deleteOne({ _id: projectId });

      console.log("Project deleted successfully");

      res.json({ message: "Project deleted successfully" });
    } catch (error) {
      console.error("Error deleting product:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
);

router.delete(
  "/projects/:projectId",
  authmiddleware,
  awsS3DeleteMiddleware,
  async (req, res) => {
    const { projectId } = req.params;

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
  }
);

module.exports = router;
