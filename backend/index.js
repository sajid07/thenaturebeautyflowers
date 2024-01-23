const connectToMongo = require('./db');
const express = require('express');
const cors = require('cors');
const Product = require('../backend/models/Product'); // Assuming you have a Product model
const Project = require('../backend/models/Projects'); // Assuming you have a Product model

const contactsRoutes = require('./routes/contacts');
const linkRoutes = require('./routes/socialLink');

connectToMongo();

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

// Available Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/contacts', require('./routes/contacts'));

app.use('/api/product', require('./routes/product'));
app.use('/api/project', require('./routes/project'));

app.use('/api/user', require('./routes/user')); // Add this line for the new user route
app.use('/api/socialLink', require('./routes/socialLink'));

// Fetch all products route
app.get('/api/product/fetchallproducts', async (req, res) => {
  try {
    // Fetch all products from the database
    const products = await Product.find();

    // Send the products as a JSON response
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
