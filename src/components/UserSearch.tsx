// src/components/UserSearch.tsx
import React, { useState } from "react";
import axios from "axios";

const UserSearch = () => {
	const [searchTerm, setSearchTerm] = useState("");
	const [searchResults, setSearchResults] = useState<any[]>([]); // Użyj odpowiedniego typu dla danych użytkowników

	const handleSearch = async () => {
		const response = await axios.get(
			`https://jsonplaceholder.typicode.com/users?username=${searchTerm}`
		);
		setSearchResults(response.data);
	};

	return (
		<div>
			<h2>Wyszukiwarka użytkowników</h2>
			<input
				type='text'
				placeholder='wpisz login'
				value={searchTerm}
				onChange={e => setSearchTerm(e.target.value)}
			/>
			<button onClick={handleSearch}>Szukaj</button>

			<div>
				{searchResults.map(user => (
					<div key={user.id}>
						<p>Nazwa użytkownika: {user.username}</p>
						<p>Imię: {user.name}</p>
						<p>Email: {user.email}</p>
						{/* Dodaj więcej informacji o użytkowniku, jeśli to konieczne */}
					</div>
				))}
			</div>
		</div>
	);
};

export default UserSearch;
