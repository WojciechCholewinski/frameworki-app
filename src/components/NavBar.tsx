// src/components/Navbar.tsx
import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useAuth } from "../context/AuthContext";

const Nav = styled.nav`
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 20px 20px 20px 20px;
	background-color: #f8f9fa;
`;

const NavList = styled.ul`
	list-style: none;
	display: flex;
	gap: 20px;
`;

const NavLink = styled(Link)`
	text-decoration: none;
	color: #007bff;
	&:hover {
		background-color: #e7e7e7; // Zmiana tła przy najechaniu
		color: #007bff; // Zmiana koloru tekstu, aby podkreślić interaktywność
	}
	color: inherit; // Spójny kolor tekstu z otoczeniem
	padding: 15px; // Padding dla lepszego wyglądu
	border-radius: 5px; // Zaokrąglenie krawędzi dla efektu po najechaniu
`;
const LogoutButton = styled.button`
	background: none;
	border: none;
	cursor: pointer;
	text-decoration: none;
	color: inherit;
	padding: 10px 10px 10px 10px;
	border-radius: 5px;

	&:hover {
		background-color: #007bff;
		color: #e7e7e7;
	}
`;
const Navbar = () => {
	const { logout } = useAuth(); // Użyj logout z useAuth
	const navigate = useNavigate(); // Użyj useNavigate do przekierowania

	const handleLogout = () => {
		logout();
		navigate("/login"); 
	};

	return (
		<Nav>
			<div></div>
			<NavList>
				<li>
					<NavLink to='/photos'>Feed zdjęć</NavLink>
				</li>
				<li>
					<NavLink to='/user'>Strona użytkownika</NavLink>
				</li>
				<li>
					<NavLink to='/search-users'>Wyszukiwanie użytkowników</NavLink>
				</li>
				<li>
					<NavLink to='/search-photos'>Wyszukiwanie zdjęć</NavLink>
				</li>
				<li>
					<NavLink to='/posts'>Posty</NavLink>
				</li>

				

			
			</NavList>
            <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
		</Nav>
	);
};

export default Navbar;
