// This file implements the movies data access object to allow our code to access movie(s) in our database
let movies // Declare movies to store the reference to the database

export default class MoviesDAO{
    static async injectDB(conn) { // Export moviesDAO which contains an async method injectDB which is called as soon as the server starts and provides the database reference to movies.
        if(movies){
            return // If the reference already exists, then we return.
        }
        try {
            movies = await conn.db(process.env.MOVIEREVIEWS_NS)
                        .collection('movies') // Else connect to the database name and movies collection
        }
        catch(e) {
            console.error(`unable to connect in MoviesDAO: ${e}`) // If we fail to get the reference, send an error to the console.
        }
    }

    static async getMovies ({//This method accepts a filter as its first argument. The default filter has no filters, retrieves results at page 0 and 20 movies per page.
        filters = null,
        page = 0,
        moviesPerPage = 20, // Will only get 20 movies at once
    } = {}) {
        let query // a query variable which will be empty unless a user specifies filters in the retrieval
        if (filters){
            if ("title" in filters){
                query = { $text: {$search: filters['title']}} // Allows users to query using multiple words.
            } else if ("rated" in filters){
                query = { "rated": { $eq: filters['rated']}} // Checks for the rated filter
            }
        }

        let cursor // Find all movies that fit our query and assign it to a cursor
        try {
            cursor = await movies
                    .find(query)
                    .limit(moviesPerPage)
                    .skip(moviesPerPage*page)
            const moviesList = await cursor.toArray()
            const totalNumMovies = await movies.countDocuments(query) // Get the total number of movies by counting the number of documents in the query and return 
            return {moviesList, totalNumMovies}
        }
        catch (e) {
            console.error(`Unable to issue find command, ${e}`)
            return {moviesList: [], totalNumMovies: 0}
        }
    }

}