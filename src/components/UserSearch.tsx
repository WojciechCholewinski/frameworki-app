// src/components/UserSearch.tsx
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
	justify-content: center;
`;

const PhotoCard = styled.div`
	margin: 10px;
	box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
	border-radius: 8px;
	overflow: hidden;

	img {
		width: 100%;
		height: auto;
	}

	p {
		padding: 10px;
	}
`;

const UserSearch = () => {
	const [searchTerm, setSearchTerm] = useState("");
	const [searchResults, setSearchResults] = useState<any[]>([]); // Użyj odpowiedniego typu dla danych użytkowników

	const handleSearch = async () => {
		const response = await axios.get(
			`https://jsonplaceholder.typicode.com/users?username=${searchTerm}`
		);
		setSearchResults(response.data);
	};

	return (
		<SearchContainer>
		  <h2>Wyszukiwarka użytkowników</h2>
		  <SearchInput
			type="text"
			placeholder="wpisz login"
			value={searchTerm}
			onChange={(e) => setSearchTerm(e.target.value)}
		  />
		  <SearchButton onClick={handleSearch}>Szukaj</SearchButton>
	
		  <div>
			{searchResults.map((user) => (
			  <PhotoCard key={user.id}>
				<p>Nazwa użytkownika: {user.username}</p>
				<p>Imię: {user.name}</p>
				<p>Email: {user.email}</p>
			  </PhotoCard>
			))}
		  </div>
		</SearchContainer>
	  );
};

export default UserSearch;
