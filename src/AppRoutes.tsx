// src/AppRoutes.tsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./components/LoginPage";
import PhotoFeed from "./components/PhotoFeed";
import UserPage from "./components/UserPage";
import UserSearch from "./components/UserSearch";
import PhotoSearch from "./components/PhotoSearch";
import PostsPage from "./components/PostsPage";
// import UserProfile from "./components/UserProfile";

// Import inne komponenty stron

const AppRoutes = () => {
	return (
		<Router>
			<Routes>
				<Route path='/login' element={<LoginPage />} />
				{/* Tutaj dodaj inne ścieżki jako element={<Komponent />} */}
				<Route path='/photos' element={<PhotoFeed />} />
				<Route path='/user' element={<UserPage />} />
				<Route path='/search-users' element={<UserSearch />} />
				<Route path='/search-photos' element={<PhotoSearch />} />
				<Route path='/posts' element={<PostsPage />} />
				{/* <Route path='/user' element={<UserProfile />} /> */}
			</Routes>
		</Router>
	);
};

export default AppRoutes;
