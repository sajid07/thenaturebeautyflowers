const mongoose = require("mongoose");
const mongoURI = process.env.REACT_APP_MONGO_DB_URI;

const connectToMongo = async () => {
  try {
    await mongoose.connect(mongoURI, {
      dbName: "pool",
    });
    console.log("Connected to MongoDB successfully");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};

module.exports = connectToMongo;
