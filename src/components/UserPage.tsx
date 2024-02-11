// src/components/UserPage.tsx
import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import "../index.css";
import styled from "styled-components";

const UserPageContainer = styled.div`
	padding: 20px;
	background-color: #f9f9f9;
`;

const UserDetailsSection = styled.section`
	padding: 20px 40px 20px 20px;
	background-color: #fff;
	border-radius: 8px;
	box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
	margin: 0px 30% 30px 30%;
`;

const UserContentSection = styled.section`
	margin-bottom: 20px;
	padding: 20px;
	background-color: #fff;
	border-radius: 8px;
	box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
`;

const Title = styled.h2`
	text-align: center;
	margin-bottom: 30px;
	color: #333;
`;

const Label = styled.label`
	display: block;
	margin-bottom: 5px;
	font-weight: bold;
`;

const Input = styled.input`
	padding: 10px;
	border: 1px solid #ccc;
	border-radius: 4px;
	width: 100%;
	margin-bottom: 15px;
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
	&:hover {
		background-color: #0056b3;
	}
	display: block;
	margin: auto;
`;

const PhotoContainer = styled.div`
	display: inline-block;
	margin: 10px;
	width: calc(33.333% - 20px);
	box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
	border-radius: 10px;
	overflow: hidden;
	transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;

	&:hover {
		transform: scale(1.05); // Lekkie powiększenie zdjęcia
		box-shadow: 0px 8px 20px rgba(0, 0, 0, 0.2); // Zwiększenie cienia
	}

	@media (max-width: 768px) {
		width: calc(50% - 20px);
	}
`;

const Photo = styled.img`
	width: 100%;
	display: block;
	max-height: 500px;
	transition: transform 0.3s ease-in-out; // Dodano dla płynności transformacji
`;

const PhotoTitle = styled.p`
	padding: 10px;
	text-align: center;
`;

const PostContainer = styled.div`
	background-color: #fff;
	border-radius: 8px;
	box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
	margin-bottom: 20px;
	padding: 20px;
	transition: box-shadow 0.3s ease-in-out;

	&:hover {
		box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
	}
`;

const PostTitle = styled.h3`
	color: #007bff;
	margin-bottom: 10px;
`;

const PostBody = styled.p`
	line-height: 1.6;
`;

// Modyfikacja komponentu UserContentSection dla postów
const PostsSection = styled(UserContentSection)`
	padding: 20px;
	background-color: #f0f0f0;
	border-radius: 8px;
	box-shadow: none; // Usunięcie cienia, jeśli chcemy, aby sekcja postów była bardziej płaska
`;

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
		<UserPageContainer>
			<Title>Dane:</Title>
			<UserDetailsSection>
				<Label>Imię i nazwisko:</Label>
				<Input
					type='text'
					value={editName}
					onChange={e => setEditName(e.target.value)}
				/>

				<Label>Login:</Label>
				<Input
					type='text'
					value={editUsername}
					onChange={e => setEditUsername(e.target.value)}
				/>

				<Label>Mail:</Label>
				<Input
					type='text'
					value={editEmail}
					onChange={e => setEditEmail(e.target.value)}
				/>

				<Button onClick={handleEdit}>Zapisz zmiany</Button>
			</UserDetailsSection>
			<UserContentSection>
				<Title>Zdjęcia użytkownika</Title>
				<div>
					{userPhotos.map(photo => (
						<PhotoContainer key={photo.id}>
							<Photo src={photo.thumbnailUrl} alt={photo.title} />
							<PhotoTitle>{photo.title}</PhotoTitle>
						</PhotoContainer>
					))}
				</div>
			</UserContentSection>

			<UserContentSection as={PostsSection}>
				<Title>Posty użytkownika</Title>
				<div>
					{userPosts.map(post => (
						<PostContainer key={post.id}>
							<PostTitle>{post.title}</PostTitle>
							<PostBody>{post.body}</PostBody>
						</PostContainer>
					))}
				</div>
			</UserContentSection>
		</UserPageContainer>
	);
};

export default UserPage;
