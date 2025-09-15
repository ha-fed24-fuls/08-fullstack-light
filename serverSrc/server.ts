import express from 'express'
import cors from 'cors'
import type { Express, Request, Response } from 'express'
import { badMovies } from './data/movies.js'
import { Movie } from './data/types.js'

const app: Express = express()
const port = 1337

// Middleware
app.use('/', cors())
app.use('/', express.static('./dist/'))

// Endpoints
app.get('/api/movies', (req, res: Response<Movie[]>) => {
	console.log('GET /movies')
	res.send(badMovies)  // status: 200 OK
})

interface IdParam {
	id: string;
}
app.delete('/api/movies/:id', (req: Request<IdParam>, res: Response<void>) => {
	const id: string = req.params.id
	const index: number = badMovies.findIndex(movie => movie.id === id)
	
	if( index === -1 ) {
		res.sendStatus(404)
		return
	}
	badMovies.splice(index, 1)
	res.sendStatus(204)
})



app.listen(port, () => {
	console.log(`Server is listening on port ${port}...`)
})