import express from 'express'
import cors from 'cors'
import type { Express, Response } from 'express'
import { badMovies } from './data/movies.js'
import { Movie } from './data/types.js'

const app: Express = express()
const port = 1337

// Middleware
app.use('/', cors())

// Endpoints
app.get('/movies', (req, res: Response<Movie[]>) => {
	console.log('GET /movies')
	res.send(badMovies)  // status: 200 OK
})



app.listen(port, () => {
	console.log(`Server is listening on port ${port}...`)
})