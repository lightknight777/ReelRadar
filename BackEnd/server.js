// This is the server file. Import middleware using express and cors. Then import movies.route.js for the routes.
import express from 'express'
import cors from 'cors'
import movies from './api/movies.route.js'

const app = express() 

// Attach cors and express.json middleware that express will use.
app.use(cors())
app.use(express.json())

// Specify inital routes for the API
app.use("/api/v1/movies/", movies)
app.use('*', (_req, res)=>{
    res.status(404).json({error:"not found"}) // If someone tries to go to a route that doesn't exist, the wildcard returns a 404 page
})

export default app