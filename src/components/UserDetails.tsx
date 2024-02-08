// src/components/UserDetails.tsx
import React, { useEffect, useState } from "react";
import axios from "axios";

interface User {
	id: number;
	name: string;
	username: string;
	email: string;
}

const UserDetails = ({ userId }: { userId: number }) => {
	const [user, setUser] = useState<User | null>(null);

	useEffect(() => {
		const fetchUser = async () => {
			try {
				const response = await axios.get(
					`https://jsonplaceholder.typicode.com/users/${userId}`
				);
				setUser(response.data);
			} catch (error) {
				console.error("Error fetching user details:", error);
			}
		};

		fetchUser();
	}, [userId]);

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
