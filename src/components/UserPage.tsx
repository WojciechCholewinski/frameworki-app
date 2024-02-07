// src/components/UserPage.tsx
import React, { useEffect, useState } from "react";
import axios from "axios";

// Zdefiniowanie interfejsu User
interface User {
	id: number;
	name: string;
	username: string;
	email: string;
	address?: {
		street: string;
		suite: string;
		city: string;
		zipcode: string;
		// Możesz dodać więcej pól zgodnie z danymi API
	};
	// Dodaj tutaj inne właściwości zgodnie z potrzebami
}

// Używając zdefiniowanego typu dla danych użytkownika
const UserPage = () => {
	const [userData, setUserData] = useState<User | null>(null);

	useEffect(() => {
		const fetchUserData = async () => {
			const response = await axios.get<User>(
				"https://jsonplaceholder.typicode.com/users/1"
			); // Zakładamy, że id użytkownika to 1 dla przykładu
			setUserData(response.data);
		};

		fetchUserData();
	}, []);

	if (!userData) return <div>Ładowanie danych użytkownika...</div>;

	return (
		<div>
			<h2>Strona użytkownika</h2>
			<p>Nazwa użytkownika: {userData.username}</p>
			<p>Imię: {userData.name}</p>
			<p>Email: {userData.email}</p>
			{/* Tutaj możesz dodać więcej danych użytkownika, np. adres */}
		</div>
	);
};

export default UserPage;
