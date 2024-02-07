// src/components/PhotoFeed.tsx
import React, { useEffect, useState } from "react";
import axios from "axios";

const PhotoFeed = () => {
	const [photos, setPhotos] = useState([]);

	useEffect(() => {
		const fetchPhotos = async () => {
			const response = await axios.get(
				"https://jsonplaceholder.typicode.com/photos?_limit=20"
			); // Ograniczamy do 20 dla przykładu
			setPhotos(response.data);
		};

		fetchPhotos();
	}, []);

	return (
		<div>
			<h2>Feed zdjęć</h2>
			<div>
				{photos.map(photo => (
					<div key={photo.id}>
						<img src={photo.thumbnailUrl} alt={photo.title} />
						<p>{photo.title}</p>
						{/* Tutaj można dodać przyciski do edycji/usuwania, jeśli użytkownik jest właścicielem zdjęcia */}
					</div>
				))}
			</div>
		</div>
	);
};

export default PhotoFeed;
