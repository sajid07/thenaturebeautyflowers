// const findConfig = require("find-config");
// require("dotenv").config({
//   override: true,
//   path: findConfig(`.env.${process.env.REACT_APP_ENV || "local"}`),
// });
// const connectToMongo = require("./db");
// const express = require("express");
// const cors = require("cors");

// connectToMongo();

// const app = express();
// const port = 5000;

// app.use(cors());
// app.use(express.json());

// // Available Routes
// app.use("/api/auth", require("./routes/auth"));
// app.use("/api/contacts", require("./routes/contacts"));
// app.use("/api/category", require("./routes/category"));

// app.use("/api/product", require("./routes/product"));
// app.use("/api/project", require("./routes/project"));

// app.use("/api/user", require("./routes/user")); // Add this line for the new user route
// app.use("/api/socialLink", require("./routes/socialLink"));

// app.listen(port, () => {
//   console.log(`Example app listening at http://localhost:${port}`);
// });
const findConfig = require("find-config");
require("dotenv").config({
  override: true,
  path: findConfig(`.env.${process.env.REACT_APP_ENV || "local"}`),
});

const connectToMongo = require("./db");
const express = require("express");
const cors = require("cors");

// Connect to MongoDB Atlas
connectToMongo();

const app = express();
const port = process.env.PORT || 5000;

// CORS setup
const allowedOrigins = [
  "https://www.thenaturebeautyflowers.com",
  "https://thenaturebeautyflowers.com",
  "http://localhost:3000", // for local testing
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true); // allow non-browser requests
      if (allowedOrigins.indexOf(origin) === -1) {
        const msg =
          "The CORS policy for this site does not allow access from the specified Origin.";
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
    credentials: true,
  })
);

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
