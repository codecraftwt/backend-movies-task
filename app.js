const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors'); 
const userRoutes = require('./routes/userRoutes');
const movieRoutes = require('./routes/movieRoutes');

dotenv.config();

const app = express();
app.use(cors());

// Middleware
app.use(express.json()); 
app.use(express.static('uploads')); 

// Routes
app.use('/api/users', userRoutes);
app.use('/api/movies', movieRoutes);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

// Start the server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
