// src/components/Navbar.tsx
import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
	return (
		<nav>
			<div>Menu</div>
			<ul>
				<li>
					<Link to='/photos'>Feed zdjęć</Link>
				</li>
				<li>
					<Link to='/user'>Strona użytkownika</Link>
				</li>
				<li>
					<Link to='/search-users'>Wyszukiwanie użytkowników</Link>
				</li>
				<li>
					<Link to='/search-photos'>Wyszukiwanie zdjęć</Link>
				</li>
				<li>
					<Link to='/posts'>Posty</Link>
				</li>
				{/* Dodaj więcej linków zgodnie z potrzebą */}
			</ul>
		</nav>
	);
};

export default Navbar;
