import app from './server.js'
import mongodb from "mongodb"
import dotenv from "dotenv"

async function main(){
    dotenv.config()
    const client = new mongodb.MongoClient(process.env.MOVIEREVIEWS_DB_URI)
    const port = process.env.PORT || 8000
    
}