import './App.css';
import { useState, useEffect } from "react"

function App() {
	const [name, setName] = useState("")
	const [names, setNames] = useState([])
	// const serverUrl = "http://localhost:4000"
	const serverUrl = process.env.REACT_APP_API_URL

	useEffect(() => {
		fetch(serverUrl)
			.then(response => response.json())
			.then(response => {
				setNames(response.names)
			})
	}, [serverUrl])

	const updateName = (event) => {
		setName(event.target.value)
	}

	const addName = (event) => {
		event.preventDefault()
		fetch(`${serverUrl}/names`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ name })
		}).then(response => response.json())
			.then(response => {
				setNames([...names, response.name])
				event.target.reset()
			})
	}

	return (
		<div className="App">
			<h1>Add a person</h1>
			<form onSubmit={addName}>
				<label htmlFor="name">Name</label>
				<input
					id="name"
					name="name"
					className="name"
					value={name}
					onInput={updateName}
				/>

				<input type="submit" value="Add name" />
			</form>
			<ul>
				{names.map(name => (
					<li key={name}>{name}</li>
				))}
			</ul>
		</div>
	);
}

export default App;
