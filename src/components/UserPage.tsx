// src/components/UserPage.tsx
import React, { useEffect, useState } from "react";
import axios from "axios";

interface Address {
	street: string;
	suite: string;
	city: string;
	zipcode: string;
}
// Zdefiniowanie interfejsu User
interface User {
	id: number;
	name: string;
	username: string;
	email: string;
	address: Address;
	// address?: {
	// 	street: string;
	// 	suite: string;
	// 	city: string;
	// 	zipcode: string;
	// Możesz dodać więcej pól zgodnie z danymi API
}
// Dodaj tutaj inne właściwości zgodnie z potrzebami
// }

// Używając zdefiniowanego typu dla danych użytkownika
const UserPage = () => {
	const [userData, setUserData] = useState<User | null>(null);
	const [editName, setEditName] = useState("");
	const [editUsername, setEditUsername] = useState("");
	const [editEmail, setEditEmail] = useState("");
	const [editStreet, setEditStreet] = useState("");
	const [editSuite, setEditSuite] = useState("");
	const [editCity, setEditCity] = useState("");
	const [editZipcode, setEditZipcode] = useState("");

	useEffect(() => {
		const fetchUserData = async () => {
			const response = await axios.get<User>(
				"https://jsonplaceholder.typicode.com/users/1"
			); // Zakładamy, że id użytkownika to 1 dla przykładu
			setUserData(response.data);
			setEditName(response.data.name); // Inicjalizacja stanu edytowanego imienia
			setEditUsername(response.data.username);
			setEditEmail(response.data.email);
			setEditStreet(response.data.address.street);
			setEditSuite(response.data.address.suite);
			setEditCity(response.data.address.city);
			setEditZipcode(response.data.address.zipcode);
		};

		fetchUserData();
	}, []);

	const handleEdit = () => {
		if (userData) {
			// setUserData({ ...userData, name: editName }); // Symulacja aktualizacji danych użytkownika
			// Symulacja aktualizacji danych użytkownika
			setUserData({
				...userData,
				name: editName,
				username: editUsername,
				email: editEmail,
				address: {
					...userData.address,
					street: editStreet,
					suite: editSuite,
					city: editCity,
					zipcode: editZipcode,
				},
			});
		}
	};
	if (!userData) return <div>Ładowanie danych użytkownika...</div>;

	return (
		<div>
			{/* do USUNIĘCIA */}
			<h2>Strona użytkownika</h2>
			<p>Nazwa użytkownika: {userData.username}</p>
			<input
				type='text'
				value={editName}
				onChange={e => setEditName(e.target.value)}
			/>
			<button onClick={handleEdit}>Zapisz zmiany</button>
			<p>Imię: {userData.name}</p>
			<p>Email: {userData.email}</p>
			{/* Tutaj możesz dodać więcej danych użytkownika, np. adres */}
			{/* ///////////////////////////////////////////// */}cz 2
			<div>
				<h2>Strona użytkownika</h2>
				<div>
					<label>Imię: </label>
					<input
						type='text'
						value={editName}
						onChange={e => setEditName(e.target.value)}
					/>
				</div>
				<div>
					<label>Nazwa użytkownika: </label>
					<input
						type='text'
						value={editUsername}
						onChange={e => setEditUsername(e.target.value)}
					/>
				</div>
				<div>
					<label>Email: </label>
					<input
						type='email'
						value={editEmail}
						onChange={e => setEditEmail(e.target.value)}
					/>
				</div>
				<div>
					<label>Ulica: </label>
					<input
						type='text'
						value={editStreet}
						onChange={e => setEditStreet(e.target.value)}
					/>
				</div>
				<div>
					<label>Suite: </label>
					<input
						type='text'
						value={editSuite}
						onChange={e => setEditSuite(e.target.value)}
					/>
				</div>
				<div>
					<label>Miasto: </label>
					<input
						type='text'
						value={editCity}
						onChange={e => setEditCity(e.target.value)}
					/>
				</div>
				<div>
					<label>Kod pocztowy: </label>
					<input
						type='text'
						value={editZipcode}
						onChange={e => setEditZipcode(e.target.value)}
					/>
				</div>
				<button onClick={handleEdit}>Zapisz zmiany</button>
			</div>
		</div>
	);
};
export default UserPage;
