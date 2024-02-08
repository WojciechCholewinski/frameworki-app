// src/components/UserProfile.tsx
import React, { useEffect, useState } from "react";
import axios from "axios";

interface User {
	id: number;
	name: string;
	// Dodaj inne potrzebne pola
}

const UserProfile = ({ userId }: { userId: number }) => {
	const [user, setUser] = useState<User | null>(null);
	const [editName, setEditName] = useState("");

	useEffect(() => {
		const fetchUser = async () => {
			const response = await axios.get(
				`https://jsonplaceholder.typicode.com/users/${userId}`
			);
			setUser(response.data);
			setEditName(response.data.name);
		};

		fetchUser();
	}, [userId]);

	const handleEditUser = () => {
		// Symulacja edycji danych użytkownika
		if (user) {
			setUser({ ...user, name: editName });
			// W prawdziwej aplikacji tutaj wysłałbyś zaktualizowane dane do API
		}
	};

	return (
		<div>
			{user ? (
				<>
					<h2>Dane użytkownika</h2>
					<p>Imię: {user.name}</p>
					{/* Dodaj wyświetlanie innych danych użytkownika */}
					<div>
						<input
							type='text'
							value={editName}
							onChange={e => setEditName(e.target.value)}
						/>
						<button onClick={handleEditUser}>Zapisz zmiany</button>
					</div>
				</>
			) : (
				<p>Ładowanie danych użytkownika...</p>
			)}
		</div>
	);
};

export default UserProfile;
