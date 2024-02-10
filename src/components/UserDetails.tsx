// src/components/UserDetails.tsx
import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

interface User {
	id: number;
	name: string;
	username: string;
	email: string;
}

const UserDetails = ({ userId }: { userId: number }) => {
	const [user, setUser] = useState<User | null>(null);
	const userDetails = useContext(AuthContext)?.userDetails; // Używam kontekstu, aby uzyskać dane zalogowanego użytkownika

	useEffect(() => {
		const fetchUser = async () => {
			// Jeśli userId odpowiada ID zalogowanego użytkownika, użyj danych z kontekstu
			if (userDetails && userId === userDetails.id) {
				setUser(userDetails);
			} else {
				// W przeciwnym razie próbujemy pobrać dane użytkownika z API
				try {
					const response = await axios.get(
						`https://jsonplaceholder.typicode.com/users/${userId}`
					);
					setUser(response.data);
				} catch (error) {
					console.error("Error fetching user details:", error);
				}
			}
		};

		fetchUser();
	}, [userId, userDetails]);

	if (!user) return <div>Loading user...</div>;

	return (
		<div>
			<p>
				Author: {user.name} ({user.username})
			</p>
		</div>
	);
};

export default UserDetails;
