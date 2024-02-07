// src/AppRoutes.tsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./components/LoginPage";
import PhotoFeed from './components/PhotoFeed';
// Import inne komponenty stron

const AppRoutes = () => {
	return (
		<Router>
			<Routes>
				<Route path='/login' element={<LoginPage />} />
				{/* Tutaj dodaj inne ścieżki jako element={<Komponent />} */}
                <Route path="/photos" element={<PhotoFeed />} />
			</Routes>
		</Router>
	);
};

export default AppRoutes;
