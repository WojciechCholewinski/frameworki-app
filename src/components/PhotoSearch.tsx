// src/components/PhotoSearch.tsx
import React, { useState } from "react";
import axios from "axios";
interface Photo {
	id: number;
	thumbnailUrl: string;
	title: string;
}

const PhotoSearch = () => {
	const [searchTerm, setSearchTerm] = useState("");
	// const [photos, setPhotos] = useState([]);
	const [photos, setPhotos] = useState<Photo[]>([]);

	const handleSearch = async () => {
		const response = await axios.get(
			`https://jsonplaceholder.typicode.com/photos?albumId=${searchTerm}`
		);
		setPhotos(response.data);
	};

	return (
		<div>
			<h2>Wyszukiwarka zdjęć</h2>
			<input
				type='text'
				value={searchTerm}
				onChange={e => setSearchTerm(e.target.value)}
				placeholder='Wpisz ID albumu'
			/>
			<button onClick={handleSearch}>Szukaj</button>
			<div>
				{photos.map(photo => (
					<div key={photo.id}>
						<img src={photo.thumbnailUrl} alt={photo.title} />
						<p>{photo.title}</p>
					</div>
				))}
			</div>
		</div>
	);
};

export default PhotoSearch;
