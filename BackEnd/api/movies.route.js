import express from 'express'
import MoviesController from './movies.controller'

const router = express.Router() // Get access to the express router
router.route('/').get(MoviesController.apiGetMovies)

export default router