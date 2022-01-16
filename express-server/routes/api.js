// Import dependencies
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

// MongoDB URL from the docker-compose file
const dbHost = 'mongodb://database/mean-docker';

// Connect to mongodb
mongoose.connect(dbHost);

// create mongoose schema
const commentSchema = new mongoose.Schema({
	comment: String,
	name: String
});

const movieSchema = new mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	Film: String,
	Genre: String,
	"Lead Studio": String,
	"Audience score": Number,
	"Profitability": Number,
	"Rotten Tomatoes %": Number,
	"Worldwide Gross": String,
	Year: Number,
	comments: {
        type: [commentSchema],
        required: false
    }
});

// create mongoose model
const Movie = mongoose.model('Movie', movieSchema);

// create mongoose model
const Comment = mongoose.model('Comment', commentSchema);

/* GET api listing. */
router.get('/', (req, res) => {
		res.send('api works');
});

/* GET all movies. */
router.get('/movies', (req, res) => {
	Movie.find({}, (err, movies) => {
		if (err) res.status(500).send(error)

		res.status(200).json(movies);
	});
});

/* GET one movie. */
router.get('/movies/:id', (req, res) => {
	Movie.findById(req.params.id, (err, users) => {
		if (err) res.status(500).send(error)

		res.status(200).json(users);
	});
});

/* Update a movie. */
router.post('/addComment', (req, res) => {
	let movie = req.body.movie;
	let comments = req.body.comments;
	
	movie.comments = comments;
	
	Movie.findByIdAndUpdate(movie._id, movie,
		{ upsert: true, new: true }, (err, movie) => {
		if (err) res.status(500).send(error);

		console.log('$$$$$$$$$$$$$$$$$$$$$$$$');
		console.log(movie);
		res.status(200).json(movie);
	});
});

module.exports = router;
