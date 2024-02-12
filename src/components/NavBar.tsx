// src/components/Navbar.tsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useAuth } from "../context/AuthContext";

const Nav = styled.nav`
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 20px 20px 20px 20px;
	background-color: #f8f9fa;
	flex-wrap: wrap;

	@media (max-width: 768px) {
		padding: 10px;
`;

const NavList = styled.ul`
	list-style: none;
	display: flex;
	gap: 20px;

	@media (max-width: 768px) {
		flex-direction: column;
		align-items: center;
		gap: 10px;
`;

const NavLink = styled(Link)`
	text-decoration: none;
	color: #007bff;
	&:hover {
		background-color: #e7e7e7;
		color: #007bff;
	}
	color: inherit; // Spójny kolor tekstu z otoczeniem
	padding: 15px; 
	border-radius: 5px;

	@media (max-width: 768px) {
		padding: 10px;
		font-size: 14px;
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

	@media (max-width: 768px) {
		padding: 5px 10px;
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
					<NavLink to='/photos'>Galeria</NavLink>
				</li>
				<li>
					<NavLink to='/user'>Mój profil</NavLink>
				</li>
				<li>
					<NavLink to='/search-users'>Użytkownicy</NavLink>
				</li>
				<li>
					<NavLink to='/search-photos'>Wyszukiwarka zdjęć</NavLink>
				</li>
				<li>
					<NavLink to='/posts'>Posty</NavLink>
				</li>
			</NavList>
			<LogoutButton onClick={handleLogout}>Wyloguj</LogoutButton>
		</Nav>
	);
};

export default Navbar;
