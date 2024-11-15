require('dotenv').config(); // This loads the variables from .env

const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors'); 
const userRoutes = require('./routes/userRoutes');
const movieRoutes = require('./routes/movieRoutes');

// Check if MONGO_URI is available in process.env
if (!process.env.MONGO_URI) {
  console.error('MongoDB URI is not defined in the .env file');
  process.exit(1); // Exit the application if MONGO_URI is missing
}

const app = express();
app.use(cors());

// Middleware
app.use(express.json()); 
app.use(express.static('uploads')); 

// Routes
app.use('/api/users', userRoutes);
app.use('/api/movies', movieRoutes);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => {
    console.error('MongoDB connection failed:', err);
    process.exit(1); // Exit the application if MongoDB connection fails
  });

// Start the server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
