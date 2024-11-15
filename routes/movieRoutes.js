const express = require('express');
const multer = require('multer');
const { createMovie, getAllMovies, getMovieById, updateMovie, deleteMovie } = require('../controllers/movieController');

const router = express.Router();

const upload = multer({ dest: 'uploads/' });

router.post('/create', upload.single('movie_img'), createMovie);
router.get('/', getAllMovies);
router.get('/:id', getMovieById);
router.put('/:id', upload.single('movie_img'), updateMovie);
router.delete('/:id', deleteMovie); 
module.exports = router;
