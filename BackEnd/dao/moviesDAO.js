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

    static async getMovies ({//default filter
        filters = null,
        page = 0,
        moviesPerPage = 20, // Will only get 20 movies at once
    } = {}) {
        let query
        if (filters){
            if ("title" in filters){
                query = { $text: {$search: filters['title']}}
            } else if ("rated" in filters){
                query = { "rated": { $eq: filters['rated']}}
            }
        }

        let cursor
        try {
            cursor = await movies
                    .find(query)
                    .limit(moviesPerPage)
                    .skip(moviesPerPage*page)
            const moviesList = await cursor.toArray()
            const totalNumMovies = await movies.countDocuments(query)
            return {moviesList, totalNumMovies}
        }
        catch (e) {
            console.error(`Unable to issue find command, ${e}`)
            return {moviesList: [], totalNumMovies: 0}
        }
    }

}