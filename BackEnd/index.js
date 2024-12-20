import app from './server.js' // Import the app exported from server.js
import mongodb from "mongodb" // Import MongoDB
import dotenv from "dotenv" // Import dotenv to access environment variables
import MoviesDAO from './dao/moviesDAO.js' // Import moviesDAO.js

async function main(){
    dotenv.config()
    const client = new mongodb.MongoClient(process.env.MOVIEREVIEWS_DB_URI) // Create an instance of the MongoClient and pass it the database URI
    const port = process.env.PORT || 8000 // Retrieve port from the envi, if not available then use port 8000

    try {
        //Connect to the MongoDB Cluster
        await client.connect() // Connect to the database and return a promise
        await MoviesDAO.injectDB(client) // Call injectDB to get initial reference to the movies collection right after connecting to DB and before starting the server
        console.log('Connected to MongoDB Cluster');

        app.listen(port, ()=> { //Start the web server
            console.log('Server is running on port:'+port); 
        })
    } catch (e) {
        console.error(e);
        process.exit(1)
    }
}
main().catch(console.error); // Call the main function and send any errors to the console