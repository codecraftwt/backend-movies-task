const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  movie_img: {
    type: String, 
  },
}, { timestamps: true });

module.exports = mongoose.model('Movie', movieSchema);
