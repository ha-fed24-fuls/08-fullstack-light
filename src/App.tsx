import { useState } from 'react'
import './App.css'
import type { Movie } from './data/types';

type EventCallback = () => void;

const App = () => {
	const [movies, setMovies] = useState<null | Movie[]>(null)

	const handleInspireClick: EventCallback = async () => {
		// OBS! Vi skriver URL på ett annat sätt - senare
		// Felhantering: try/catch, kontrollera statuskod
		const response: Response = await fetch('http://localhost:1337/movies', {
			method: 'GET'
		})
		if( response.status !== 200 ) {
			console.log('Fel statuskod från server: ', response.status)
			return
		}
		const data = await response.json()
		// TODO: validera att vi får korrekt data (lista med Movie objekt)
		setMovies(data)
	}

	return (
		<div className="app">
			<h1> Watch some bad movies!! </h1>
			<button onClick={handleInspireClick}> Inspire me! </button>
			<div className="movies">
				{movies && movies.map(movie => (
					<p key={movie.id}> {movie.title} - {movie.premiere} </p>
				))}
			</div>
		</div>
	)
}

export default App
