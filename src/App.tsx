import { useState } from 'react'
import './App.css'
import type { Movie } from './data/types';

type EventCallback = () => void;
type EventCallbackWithId = (id: string) => void;

const App = () => {
	const [movies, setMovies] = useState<null | Movie[]>(null)

	const handleInspireClick: EventCallback = async () => {
		// OBS! Vi skriver URL på ett annat sätt - senare
		// Felhantering: try/catch, kontrollera statuskod
		const response: Response = await fetch('/api/movies', {
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
	const handleDelete: EventCallbackWithId = async id => {
		const response = await fetch('/api/movies/' + id, {
			method: 'DELETE'
		})
		console.log('handleDelete, response from server = ', response.status)
		if( response.status === 204 ) {
			// todo: visa en uppdatering för användaren "allt har lyckats"
			handleInspireClick()  // hämta listan från servern igen
		} else {
			// todo: visa felmeddelande för användaren
		}
	}

	return (
		<div className="app">
			<h1> Watch some bad movies!! </h1>
			<button onClick={handleInspireClick}> Inspire me! </button>
			<div className="movies">
				{movies && movies.map(movie => (
					<p key={movie.id}> {movie.title} - {movie.premiere}
					<button onClick={() => handleDelete(movie.id)}> Delete </button>
					</p>
				))}
			</div>
		</div>
	)
}

export default App
