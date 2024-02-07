// src/components/LoginPage.tsx
import React, { useState } from "react";
//import axios from 'axios';


const LoginPage = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	const handleLogin = async () => {
		// Tutaj możesz dodać logikę logowania, na przykład:
		// axios.post('url_do_backendu', { username, password })
		//   .then(response => {
		//     // Przechowaj token w localStorage lub przekieruj użytkownika
		//   })
		//   .catch(error => {
		//     // Obsługa błędu logowania
		//   });
		console.log("Logowanie", username, password);
	};

	return (
		<div>
			<h2>Logowanie</h2>
			<input
				type='text'
				placeholder='Username'
				value={username}
				onChange={e => setUsername(e.target.value)}
			/>
			<input
				type='password'
				placeholder='Password'
				value={password}
				onChange={e => setPassword(e.target.value)}
			/>
			<button onClick={handleLogin}>Zaloguj się</button>
		</div>
	);
};

export default LoginPage;
