import app from './server.js' // Import the app exported from server.js
import mongodb from "mongodb" // Import MongoDB
import dotenv from "dotenv" // Import dotenv to access environment variables

async function main(){
    dotenv.config()
    const client = new mongodb.MongoClient(process.env.MOVIEREVIEWS_DB_URI) // Create an instance of the MongoClient and pass it the database URI
    const port = process.env.PORT || 8000 // Retrieve port from the envi, if not available then use port 8000

    try {
        //Connect to the MongoDB Cluster
        await client.connect() // Connect to the database and return a promise

        app.listen(port, ()=> { //Start the web server
            console.log('Sever is running on port:'+port); 
        })
    } catch (e) {
        console.error(e);
        process.exit(1)
    }
}
main().catch(console.error); // Call the main function and send any errors to the console