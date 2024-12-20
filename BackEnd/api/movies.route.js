import express from 'express';
import MoviesController from './movies.controller.js';

const router = express.Router() // Get access to the express router
router.route('/').get(MoviesController.apiGetMovies);
//router.route('/:id').get(MoviesController.apiGetMovieById);

export default router;