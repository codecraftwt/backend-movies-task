const Movie = require('../models/movie');
const cloudinary = require('../config/cloudinaryConfig');

exports.createMovie = async (req, res) => {
    const { title, year } = req.body;

    try {
        if (!title || !year) {
            return res.status(400).json({ message: "Title and year are required" });
        }

        const newMovie = new Movie({
            title,
            year,
        });

        if (req.file) {
            try {
                const result = await cloudinary.uploader.upload(req.file.path);
                newMovie.movie_img = result.secure_url;
            } catch (cloudinaryError) {
                console.error("Cloudinary upload failed:", cloudinaryError);
                return res.status(500).json({ message: "Failed to upload image to Cloudinary", error: cloudinaryError });
            }
        }

        await newMovie.save();
        res.status(201).json({
            message: 'Movie created successfully',
            movie: newMovie
        });
    } catch (error) {
        console.error("Error during movie creation:", error);
        res.status(500).json({ message: 'Server error', error });
    }
};

exports.getAllMovies = async (req, res) => {
    try {
        const movies = await Movie.find();
        res.status(200).json(movies);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

exports.getMovieById = async (req, res) => {
    try {
        const movieId = req.params.id;
        const movie = await Movie.findById(movieId);

        if (!movie) {
            return res.status(404).json({ message: 'Movie not found' });
        }

        res.json(movie);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error });
    }
};

exports.updateMovie = async (req, res) => {
    const { title, year } = req.body;
    const movieId = req.params.id;

    try {
        const movie = await Movie.findById(movieId);

        if (!movie) {
            return res.status(404).json({ message: 'Movie not found' });
        }

        if (title) movie.title = title;
        if (year) movie.year = year;

        if (req.file) {
            const result = await cloudinary.uploader.upload(req.file.path);
            movie.movie_img = result.secure_url; 
        }

        const updatedMovie = await movie.save();
        res.status(200).json({
            message: 'Movie updated successfully',
            movie: updatedMovie
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error });
    }
};

exports.deleteMovie = async (req, res) => {
    const movieId = req.params.id;

    try {
        const movie = await Movie.findById(movieId);

        if (!movie) {
            return res.status(404).json({ message: 'Movie not found' });
        }

        if (movie.movie_img) {
            const publicId = movie.movie_img.split('/').pop().split('.')[0];
            await cloudinary.uploader.destroy(publicId); 
        }

        await Movie.findByIdAndDelete(movieId);

        res.status(200).json({ message: 'Movie deleted successfully' });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error });
    }
};