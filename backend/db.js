const mongoose = require("mongoose");
const mongoURI =
  "mongodb+srv://sajidishaq007:sajidishaq007@cluster0.njdr9nj.mongodb.net/pool";
 
  
  const connectToMongo = async () => {
    try {
      await mongoose.connect(mongoURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log('Connected to MongoDB successfully');
    } catch (error) {
      console.error('Error connecting to MongoDB:', error);
    }
  };
  
  module.exports = connectToMongo;
  