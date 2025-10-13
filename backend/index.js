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

// Force redirect non-www to www
app.use((req, res, next) => {
  if (req.headers.host === "thenaturebeautyflowers.com") {
    return res.redirect(
      301,
      "https://www.thenaturebeautyflowers.com" + req.url
    );
  }
  next();
});

// Allowed origins for CORS
const allowedOrigins = [
  "https://www.thenaturebeautyflowers.com",
  "http://localhost:3000",
];

// Apply CORS middleware
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true); // Allow Postman etc.
      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        console.log("Blocked by CORS:", origin);
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "auth-token"],
    credentials: true,
  })
);

// Handle preflight (OPTIONS) requests globally
app.options("*", (req, res) => {
  res.header("Access-Control-Allow-Origin", req.headers.origin);
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, auth-token"
  );
  res.sendStatus(200);
});

// Parse JSON bodies
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
  console.log(`Server running at port ${port}`);
});
