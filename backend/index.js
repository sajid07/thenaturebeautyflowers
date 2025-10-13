const findConfig = require("find-config");
require("dotenv").config({
  override: true,
  path: findConfig(`.env.${process.env.REACT_APP_ENV || "local"}`),
});

const connectToMongo = require("./db");
const express = require("express");
const cors = require("cors");

connectToMongo();

const app = express();
const port = process.env.PORT || 5000;

// CORS setup
const allowedOrigins = [
  "https://www.thenaturebeautyflowers.com",
  "https://thenaturebeautyflowers.com",
  "https://thenaturebeautyflowers.onrender.com",
  "http://localhost:3000",
];

// Apply CORS before other middleware
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      console.log("Blocked by CORS:", origin);
      return callback(new Error("Not allowed by CORS"));
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "auth-token"],
    credentials: true,
    optionsSuccessStatus: 200,
  })
);

// Handle preflight for all routes
// app.options("*", cors());

// Body parser middleware
app.use(express.json());

// Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/contacts", require("./routes/contacts"));
app.use("/api/category", require("./routes/category"));
app.use("/api/product", require("./routes/product"));
app.use("/api/project", require("./routes/project"));
app.use("/api/user", require("./routes/user"));
app.use("/api/socialLink", require("./routes/socialLink"));

// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
