import { useState } from 'react'
import './App.css'
import type { Movie } from './data/types';

type EventCallback = () => void;
type EventCallbackWithId = (id: string) => void;

interface Form {
	title: string;
	premiere: number;
}

const App = () => {
	const [movies, setMovies] = useState<null | Movie[]>(null)
	const [editingId, setEditingId] = useState<string | null>(null)
	const [form, setForm] = useState<Form>({ title: '', premiere: 0 })

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

	const handleEdit: EventCallbackWithId = id => {
		setEditingId(id)
		if( !movies ) return;

		const movie: Movie | undefined = movies.find(m => m.id === id)
		if( !movie ) return;

		setForm({
			title: movie.title,
			premiere: movie.premiere
		})
	}
	const handleSave: EventCallbackWithId = async id => {
		const response = await fetch('/api/movies/' + id, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(form)  // backend kommer få form-objektet
		})
		if( response.status !== 200 ) {
			console.log('Felkod från servern: ', response.status)
			// TODO: visa användaren att det inte gick, typ "försök igen senare"
			return
		}
		setEditingId(null)  // tala om att vi slutat editera
		setForm({ title: '', premiere: 0 })
		handleInspireClick()  // se till att listan är uppdaterad
	}

	return (
		<div className="app">
			<h1> Watch some bad movies!! </h1>
			<button onClick={handleInspireClick}> Inspire me! </button>
			<div className="movies">
				{movies && movies.map(movie => (
					<p key={movie.id}>
						{editingId === movie.id
						? (<>
							<input type="text" value={form.title} onChange={event => setForm({ ...form, title: event.target.value })} />
							<input type="text" value={form.premiere} onChange={event => setForm({ ...form, premiere: Number(event.target.value) })} />
							<button onClick={() => handleSave(movie.id)}> Save edit </button>
						</>)
						: <>
							{movie.title} - {movie.premiere}
							<button onClick={() => handleEdit(movie.id)}> Edit </button>
						</>}

						<button onClick={() => handleDelete(movie.id)}> Delete </button>
					</p>
				))}
			</div>
		</div>
	)
}

export default App
