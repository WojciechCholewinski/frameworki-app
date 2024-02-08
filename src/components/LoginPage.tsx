// src/components/LoginPage.tsx
import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";

//import axios from 'axios';

const LoginPage = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const { login } = useAuth();

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		login(username, password);
	};

	/// DO USUNIĘCIA
	// const handleLogin = async () => {
	// 	// Tutaj możesz dodać logikę logowania, na przykład:
	// 	// axios.post('url_do_backendu', { username, password })
	// 	//   .then(response => {
	// 	//     // Przechowaj token w localStorage lub przekieruj użytkownika
	// 	//   })
	// 	//   .catch(error => {
	// 	//     // Obsługa błędu logowania
	// 	//   });
	// 	console.log("Logowanie", username, password);
	// };

	return (
		<div>
			<form onSubmit={handleSubmit}>
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
				<button type='submit'>Log In</button>
			</form>
			{/* DO USUNIĘCIA */}
			{/* <div>
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
			</div> */}
		</div>
	);
};

// DO USUNIĘCIA
// return (
// 	<div>
// 		<h2>Logowanie</h2>
// 		<input
// 			type='text'
// 			placeholder='Username'
// 			value={username}
// 			onChange={e => setUsername(e.target.value)}
// 		/>
// 		<input
// 			type='password'
// 			placeholder='Password'
// 			value={password}
// 			onChange={e => setPassword(e.target.value)}
// 		/>
// 		<button onClick={handleLogin}>Zaloguj się</button>
// 	</div>
// );
// };
export default LoginPage;
