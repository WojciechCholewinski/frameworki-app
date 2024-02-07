// src/components/PhotoFeed.tsx
import React, { useEffect, useState } from "react";
import axios from "axios";

interface Photo {
	/////////////////////////////////////////////////////
	id: number;
	thumbnailUrl: string;
	title: string;
	isOwner?: boolean; // Opcjonalne, dodane dla symulacji właścicielstwa
}

const PhotoFeed = () => {
	// const [photos, setPhotos] = useState([]);////////////////////////////////////////////////////////////////
	const [photos, setPhotos] = useState<Photo[]>([]);

	useEffect(() => {
		const fetchPhotos = async () => {
			const response = await axios.get(
				"https://jsonplaceholder.typicode.com/photos?_limit=20"
			); // Ograniczamy do 20 dla przykładu
			// Symulacja dodania flagi "isOwner", aby pokazać przyciski edycji/usuwania
			const photosWithOwnership = response.data.map((photo: Photo) => ({
				...photo,
				isOwner: Math.random() < 0.5, // Przypisz losowo wartość, symulując "właścicielstwo"
			}));
			setPhotos(photosWithOwnership);
			// setPhotos(response.data);
		};

		fetchPhotos();
	}, []);

	// Symulacja usunięcia zdjęcia
	const handleDelete = (id: number) => {
		setPhotos(photos.filter(photo => photo.id !== id));
	};

	return (
		<div>
			<h2>Feed zdjęć</h2>
			<div>
				{photos.map(photo => (
					<div key={photo.id}>
						<img src={photo.thumbnailUrl} alt={photo.title} />
						<p>{photo.title}</p>
						{photo.isOwner && (
							<div>
								{/* Symulowane przyciski edycji i usuwania */}
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
