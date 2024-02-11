// src/components/PhotoSearch.tsx
import React, { useState } from "react";
import axios from "axios";
import styled from "styled-components";

const SearchContainer = styled.div`
	text-align: center;
	padding: 20px;
`;

const SearchInput = styled.input`
	margin: 10px;
	padding: 10px;
	border-radius: 4px;
	border: 1px solid #ccc;
`;

const SearchButton = styled.button`
	padding: 10px 15px;
	background-color: #007bff;
	color: #fff;
	border: none;
	border-radius: 4px;
	cursor: pointer;

	&:hover {
		background-color: #0056b3;
	}
`;

const PhotosContainer = styled.div`
	display: flex;
	flex-wrap: wrap;
	justify-content: space-around; // Aby zdjęcia były równomiernie rozmieszczone
	padding: 20px;
	background-color: #f9f9f9;
`;

const PhotoCard = styled.div`
	box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
	border-radius: 10px;
	overflow: hidden;
	margin: 10px;
	flex: 1 1 300px; // Elastyczność elementu z bazową szerokością
	max-width: calc(
		50% - 20px
	); // Maksymalna szerokość dla dwóch elementów w rzędzie z marginesem

	&:hover {
		transform: scale(1.01); // Lekkie powiększenie zdjęcia
		box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2); // Zwiększenie cienia
	}

	@media (max-width: 768px) {
		max-width: calc(
			100% - 20px
		); // Na mniejszych ekranach zdjęcie zajmuje całą szerokość
	}

	img {
		width: 100%;
		height: auto;
	}

	p {
		padding: 10px;
		text-align: center; // Wyśrodkowanie tytułu
	}
`;

interface Photo {
	id: number;
	thumbnailUrl: string;
	title: string;
}

const PhotoSearch = () => {
	const [searchTerm, setSearchTerm] = useState("");
	const [photos, setPhotos] = useState<Photo[]>([]);

	const handleSearch = async () => {
		const response = await axios.get(
			`https://jsonplaceholder.typicode.com/photos?albumId=${searchTerm}`
		);
		setPhotos(response.data);
	};

	return (
		<SearchContainer>
			<h2>Wyszukiwarka zdjęć</h2>
			<SearchInput
				type='text'
				value={searchTerm}
				onChange={e => setSearchTerm(e.target.value)}
				placeholder='Wpisz ID albumu'
			/>
			<SearchButton onClick={handleSearch}>Szukaj</SearchButton>
			<PhotosContainer>
				{photos.map(photo => (
					<PhotoCard key={photo.id}>
						<img src={photo.thumbnailUrl} alt={photo.title} />
						<p>{photo.title}</p>
					</PhotoCard>
				))}
			</PhotosContainer>
		</SearchContainer>
	);
};

export default PhotoSearch;
