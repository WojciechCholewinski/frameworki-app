// src/components/PhotoFeed.tsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import "../index.css";
import styled from "styled-components";
import { useAuth } from "../context/AuthContext";

// Stylizowany kontener dla feedu zdjęć
const PhotoFeedContainer = styled.div`
	display: flex;
	flex-wrap: wrap;
	padding: 20px;
	background-color: #f9f9f9;
	justify-content: space-around; // Rozmieść elementy równomiernie, z zachowaniem przestrzeni na krawędziach
`;

// Stylizowany kontener dla pojedynczego zdjęcia
const PhotoContainer = styled.div`
	box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
	border-radius: 10px;
	overflow: hidden;
	margin: 10px;
	flex: 1 1 300px; // Elastyczność elementu z bazową szerokością 200px
	max-width: calc(
		50% - 20px
	); // Maksymalna szerokość dla dwóch elementów w rzędzie z marginesem

	transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;

	&:hover {
		transform: scale(1.01); // Lekkie powiększenie zdjęcia
		box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2); // Zwiększenie cienia
	}

	@media (max-width: 768px) {
		width: calc(50% - 20px);
	}

	@media (max-width: 768px) {
		max-width: calc(
			100% - 20px
		); // Na mniejszych ekranach zdjęcie zajmuje całą szerokość
	}
`;

// Stylizowany przycisk, podobny do LogoutButton
const PhotoButton = styled.button`
	background: none;
	border: 1px solid #007bff;
	color: #007bff;
	padding: 5px 10px;
	border-radius: 5px;
	cursor: pointer;
	margin-right: 5px;

	&:hover {
		background-color: #007bff;
		color: white;
	}
`;

const Header = styled.h2`
	text-align: center;
	margin: 30px 0;
	font-size: 24px;
	color: #333;
`;

const Section = styled.section`
	margin-bottom: 20px;
	padding: 20px;
	background-color: #f7f7f7;
	border-radius: 8px;
	box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const FormRow = styled.div`
	display: flex;
	justify-content: center;
	gap: 10px;
	margin-bottom: 15px;
`;

const Input = styled.input`
	padding: 10px;
	border: 1px solid #ccc;
	border-radius: 4px;
	width: 100%;
	max-width: 220px;
	&:focus {
		border-color: #007bff;
		outline: none;
	}
`;

const Button = styled.button`
	padding: 10px 15px;
	background-color: #007bff;
	color: #fff;
	border: none;
	border-radius: 4px;
	cursor: pointer;
	transition: transform 0.1s ease-in-out, box-shadow 0.1s ease-in-out;
	box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

	&:hover {
		transform: translateY(-2px); // Lekkie przesunięcie do góry
		box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); // Zwiększenie cienia dla efektu głębi
	}

	&:active {
		transform: translateY(1px); // Efekt "naciśnięcia" przycisku
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2); // Przywrócenie mniejszego cienia
	}
`;

interface Photo {
	id: number;
	thumbnailUrl: string;
	title: string;
	userId: number; 
	isOwner?: boolean; // Opcjonalne, dodane dla symulacji właścicielstwa
}

const PhotoFeed = () => {
	const [photos, setPhotos] = useState<Photo[]>([]);
	const [userIdFilter, setUserIdFilter] = useState(""); // Stan dla filtrowaniazdjęć (nowo dodanych) po userId
	const [photoIdFilter, setPhotoIdFilter] = useState(""); // Stan dla filtrowania po ID zdjęć z API
	const [newPhotoTitle, setNewPhotoTitle] = useState(""); // Stan dla tytułu nowego zdjęcia
	const [newPhotoUrl, setNewPhotoUrl] = useState(""); // Stan dla URL nowego zdjęcia
	const { userPhotos, addUserPhoto, removeUserPhoto, userDetails } = useAuth(); // Użyj hooka do uzyskania dostępu do zdjęć użytkownika i funkcji dodającej zdjęcie
	const [isAddPhotoSectionVisible, setIsAddPhotoSectionVisible] =
		useState(false);

	// Funkcja do pobierania zdjęć z opcjonalnym filtrowaniem
	useEffect(() => {
		const fetchPhotos = async () => {
			const response = await axios.get(
				"https://jsonplaceholder.typicode.com/photos"
			);
			setPhotos([...userPhotos, ...response.data]); // Najpierw umieść zdjęcia użytkownika

			
		};

		fetchPhotos();
	}, [userPhotos]); // Dodaj userPhotos do zależności, aby na nowo pobrać zdjęcia po dodaniu nowego zdjęcia przez użytkownika

	// Aktualizacja filtrowania, aby uwzględnić oba filtry
	const filteredPhotos = photos.filter(photo => {
		const userIdMatch = userIdFilter
			? String(photo.userId) === userIdFilter
			: true;
		const photoIdMatch = photoIdFilter
			? String(photo.id) === photoIdFilter
			: true;
		return userIdMatch && photoIdMatch;
	});

	// Funkcja do symulacji dodawania nowego zdjęcia
	const handleAddPhoto = () => {
		const newPhoto = {
			id: Math.floor(Math.floor(Math.random() * 1001) + 5000),

			thumbnailUrl: newPhotoUrl,
			title: newPhotoTitle,
			userId: parseInt(userIdFilter) || 2137, // Przykładowe przypisanie do użytkownika
			isOwner: true,
		};
		addUserPhoto(newPhoto); // Dodajemy zdjęcie do kontekstu zamiast do stanu lokalnego
		// Wyczyść pola formularza
		setNewPhotoTitle("");
		setNewPhotoUrl("");
	};

	// Funkcja do symulacji usuwania zdjęcia
	const handleDelete = (id: number) => {
		setPhotos(photos.filter(photo => photo.id !== id));

		// Usuwamy zdjęcie z kontekstu, jeśli jest zdjęciem użytkownika
		removeUserPhoto(id);
	};

	return (
		<>
			<Header>Galeria zdjęć</Header>

			<Section>
				<FormRow>
					<Input
						type='text'
						placeholder={`Filtruj po ID użytkownika (np ${userDetails?.id})`}
						value={userIdFilter}
						onChange={e => setUserIdFilter(e.target.value)}
					/>
					<Input
						type='text'
						placeholder='Filtruj po ID zdjęcia'
						value={photoIdFilter}
						onChange={e => setPhotoIdFilter(e.target.value)}
					/>
					<Button
						onClick={() =>
							setIsAddPhotoSectionVisible(!isAddPhotoSectionVisible)
						}>
						{isAddPhotoSectionVisible
							? "Ukryj  \u2191"
							: "Dodaj nowe zdjęcie  \u2193"}
					</Button>
				</FormRow>
			</Section>
			<Section style={{ display: isAddPhotoSectionVisible ? "block" : "none" }}>
				<FormRow>
					<Input
						type='text'
						placeholder='Tytuł nowego zdjęcia'
						value={newPhotoTitle}
						onChange={e => setNewPhotoTitle(e.target.value)}
					/>
					<Input
						type='text'
						placeholder='URL nowego zdjęcia'
						value={newPhotoUrl}
						onChange={e => setNewPhotoUrl(e.target.value)}
					/>
					<Button onClick={handleAddPhoto}>Dodaj zdjęcie</Button>
				</FormRow>
			</Section>
			<PhotoFeedContainer>
				{/* Tutaj wyświetlamy zdjęcia w siatce */}
				{filteredPhotos.map(photo => (
					<PhotoContainer key={photo.id}>
						<img
							src={photo.thumbnailUrl}
							alt={photo.title}
							style={{ width: "100%", height: "auto", display: "block" }}
						/>
						<div style={{ padding: "10px" }}>
							<p>{photo.title}</p>
							{photo.isOwner && (
								<div>
									<PhotoButton onClick={() => handleDelete(photo.id)}>
										Usuń
									</PhotoButton>
								</div>
							)}
						</div>
					</PhotoContainer>
				))}
			</PhotoFeedContainer>
		</>
	);
};

export default PhotoFeed;
