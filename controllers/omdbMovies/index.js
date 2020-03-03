const express = require('express');
const router = express.Router();

const omdb = require('./movies');

router.get('/',omdb.fetchOmdbMoviesFeedIntoDB);
router.post('/countMovies',omdb.countNoOfMovie);
router.post('/',omdb.getMovies);


module.exports = (app) => {
    app.use('/v1/omdb', router);
}