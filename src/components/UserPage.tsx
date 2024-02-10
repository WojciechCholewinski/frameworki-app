// src/components/UserPage.tsx
import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

const UserPage = () => {
	const { userDetails, setUserDetails, userPhotos, userPosts } = useAuth();

	const [editName, setEditName] = useState(userDetails?.name || "");
	const [editUsername, setEditUsername] = useState(userDetails?.username || "");
	const [editEmail, setEditEmail] = useState(userDetails?.email || "");

	useEffect(() => {
		// Aktualizacja stanów formularza, gdy userDetails się zmienia
		setEditName(userDetails?.name || "");
		setEditUsername(userDetails?.username || "");
		setEditEmail(userDetails?.email || "");
	}, [userDetails]);

	const handleEdit = () => {
		// Aktualizacja userDetails w kontekście
		if (userDetails) {
			setUserDetails({
				...userDetails,
				name: editName,
				username: editUsername,
				email: editEmail,
			});
		}
	};

	if (!userDetails) return <div>Ładowanie danych użytkownika...</div>;

	return (
		<div>
			<h2>Strona użytkownika</h2>
			<div>
				<label>Imię i nazwisko: </label>
				<input
					type='text'
					value={editName}
					onChange={e => setEditName(e.target.value)}
				/>
			</div>

			<div>
				<label>login: </label>
				<input
					type='text'
					value={editUsername}
					onChange={e => setEditUsername(e.target.value)}
				/>
			</div>

			<div>
				<label>Mail: </label>
				<input
					type='text'
					value={editEmail}
					onChange={e => setEditEmail(e.target.value)}
				/>
			</div>

			<button onClick={handleEdit}>Zapisz zmiany</button>

			<div>
				{userPhotos.map(photo => (
					<div key={photo.id}>
						<h3>Zdjęcia użytkownika</h3>
						<img
							src={photo.thumbnailUrl}
							alt={photo.title}
							style={{ width: "100px", height: "100px" }}
						/>
						<p>{photo.title}</p>
					</div>
				))}
			</div>

			<div>
				{userPosts.map(post => (
					<div key={post.id}>
						<h3>Posty użytkownika {editName}</h3>
						<p>{post.title}</p>
						<p>{post.body}</p>
						<p>{}</p>
					</div>
				))}
			</div>
		</div>
	);
};
export default UserPage;
