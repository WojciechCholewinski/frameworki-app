// src/components/LoginPage.tsx
import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

import styled from "styled-components";



const LoginContainer = styled.div`
	display: flex;
	justify-content: center;
	align-items: flex-start; // Zmienione z center na flex-start
	padding-top: 25vh; // Dodano padding u góry
`;

const Form = styled.form`
	display: flex;
	flex-direction: column;
	gap: 10px;
	width: 300px;
`;

const Input = styled.input`
	padding: 10px;
	border-radius: 5px;
	border: 1px solid #ccc;
`;

const Button = styled.button`
	padding: 10px;
	border-radius: 5px;
	border: none;
	background-color: #007bff;
	color: white;
	cursor: pointer;
	&:hover {
		background-color: #0056b3;
	}
`;

const LoginPage = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const { login } = useAuth();
	const navigate = useNavigate();

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		login(username, password);
		if (username === "login" && password === "1234") {
			navigate("/photos");
		} else {
			alert("Niepoprawny login lub hasło");
		}
	};


	return (
		<LoginContainer>
			<Form onSubmit={handleSubmit}>
				<Input
					type='text'
					placeholder='Username'
					value={username}
					onChange={e => setUsername(e.target.value)}
				/>
				<Input
					type='password'
					placeholder='Password'
					value={password}
					onChange={e => setPassword(e.target.value)}
				/>
				<Button type='submit'>Log In</Button>
			</Form>
		</LoginContainer>
	);
};
export default LoginPage;
