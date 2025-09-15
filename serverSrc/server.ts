import express from 'express'
import cors from 'cors'
import type { Express, Request, Response } from 'express'
import { badMovies } from './data/movies.js'
import { Movie } from './data/types.js'

type SuccessRes<T> = {
  success: true;
  data: T;
  message?: string;
};

type ErrorRes = {
  success: false;
  error: string;
};

const app: Express = express();
const port = 1337;

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

app.get("/movies/:id", (
    req: Request<{ id: string }, SuccessRes<Movie> | ErrorRes, void>,
    res: Response<SuccessRes<Movie> | ErrorRes>
  ) => {
    const rawId = req.params.id;
    const id = Number(rawId);

    if (!id) {
      return res
        .status(400)
        .json({ success: false, error: "Invalid id data type" });
    }

    const movie = badMovies.find((movie) => Number(movie.id) === id);

    if (!movie) {
      return res
        .status(404)
        .json({ success: false, error: `Movie was not found` });
    }

    res.status(200).json({
      success: true,
      message: `Found movie: ${movie?.title}`,
      data: movie,
    });
  }
);

app.listen(port, () => {
  console.log(`Server is listening on port ${port}...`);
});
