// src/components/PhotoFeed.tsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import "../index.css";
// Reszta Twojego kodu komponentu

interface Photo {
	id: number;
	thumbnailUrl: string;
	title: string;
	userId: number; // Dodano userId do interfejsu
	isOwner?: boolean; // Opcjonalne, dodane dla symulacji właścicielstwa
}

const PhotoFeed = () => {
	const [photos, setPhotos] = useState<Photo[]>([]);
	const [userIdFilter, setUserIdFilter] = useState(""); // Stan dla filtrowania po userId
	const [newPhotoTitle, setNewPhotoTitle] = useState(""); // Stan dla tytułu nowego zdjęcia
	const [newPhotoUrl, setNewPhotoUrl] = useState(""); // Stan dla URL nowego zdjęcia

	// Funkcja do pobierania zdjęć z opcjonalnym filtrowaniem
	useEffect(() => {
		const fetchPhotos = async () => {
			let url = "https://jsonplaceholder.typicode.com/photos?_limit=20";
			if (userIdFilter) url += `&userId=${userIdFilter}`;
			const response = await axios.get(url);
			const photosWithOwnership = response.data.map((photo: Photo) => ({
				...photo,
				isOwner: Math.random() < 0.5, // Symulacja "właścicielstwa"
			}));
			setPhotos(photosWithOwnership);
		};

		fetchPhotos();
	}, [userIdFilter]); // Dodaj userIdFilter do tablicy zależności, aby na nowo pobierać zdjęcia przy zmianie filtra

	// Funkcja do symulacji dodawania nowego zdjęcia
	const handleAddPhoto = () => {
		const newPhoto = {
			id: Math.random(), // Symulacja generowania ID
			thumbnailUrl: newPhotoUrl,
			title: newPhotoTitle,
			userId: parseInt(userIdFilter) || 1, // Przykładowe przypisanie do użytkownika
			isOwner: true,
		};
		setPhotos([newPhoto, ...photos]);
		// Wyczyść pola formularza
		setNewPhotoTitle("");
		setNewPhotoUrl("");
	};

	// Funkcja do symulacji usuwania zdjęcia
	const handleDelete = (id: number) => {
		setPhotos(photos.filter(photo => photo.id !== id));
	};

	return (
		<div>
			<h2>Feed zdjęć</h2>
			{/* Inputy i przycisk dodawania zdjęcia */}
			<input
				type='text'
				placeholder='Filtruj po ID użytkownika'
				value={userIdFilter}
				onChange={e => setUserIdFilter(e.target.value)}
			/>
			<div>
				<input
					type='text'
					placeholder='Tytuł nowego zdjęcia'
					value={newPhotoTitle}
					onChange={e => setNewPhotoTitle(e.target.value)}
				/>
				<input
					type='text'
					placeholder='URL nowego zdjęcia'
					value={newPhotoUrl}
					onChange={e => setNewPhotoUrl(e.target.value)}
				/>
				<button onClick={handleAddPhoto}>Dodaj zdjęcie</button>
			</div>

			<div>
				{photos.map(photo => (
					<div key={photo.id}>
						<img
							src={photo.thumbnailUrl}
							alt={photo.title}
							style={{ width: "150px", height: "150px", objectFit: "cover" }}
						/>
						<p>{photo.title}</p>
						{photo.isOwner && (
							<div>
								<button onClick={() => console.log("Editing", photo.id)}>
									Edytuj
								</button>
								<button onClick={() => handleDelete(photo.id)}>Usuń</button>
							</div>
						)}
					</div>
				))}
			</div>
		</div>
	);
};

export default PhotoFeed;
