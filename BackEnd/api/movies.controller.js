import MoviesDAO from '../dao/moviesDAO.js'
export default class MoviesController {

    static async apiGetMovies (req, res, next){ // When apiGetMovies is called via a URL, there will be a query string in the response object
        const moviesPerPage = req.query.moviesPerPage ? parseInt(req.query.moviesPerPage) : 20 // One of the query strings will be movies per page. Check if it exists and parse it into integer
        const page = req.query.page ? parseInt(req.query.page): 0 // The same is done for the page query string

        let filters= {} // Start an empty filters object (no filters applied first)

        if (req.query.rated){
            filters.rated = req.query.rated // Check if the rated query string exists, then add to the filters object.
        }
        else if(req.query.title){
            filters.title = req.query.title // Do the same for the title.
        }

        const {moviesList, totalNumMovies} = await MoviesDAO.getMovies({filters, page, moviesPerPage}) // Call getMovies in MoviesDAO. This will return moviesList and totalNumMovies

        let response = { // Send a JSON response with the above response object to whoever calls this URL
            movies : moviesList,
            page: page,
            filters : filters,
            entries_per_page: moviesPerPage,
            total_results: totalNumMovies,
        }
        res.json(response)
        
    }
}