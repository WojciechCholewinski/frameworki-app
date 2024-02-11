// src/AppRoutes.tsx
import React from "react";
import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate,
} from "react-router-dom";
import LoginPage from "./components/LoginPage";
import PhotoFeed from "./components/PhotoFeed";
import UserPage from "./components/UserPage";
import UserSearch from "./components/UserSearch";
import PhotoSearch from "./components/PhotoSearch";
import PostsPage from "./components/PostsPage";
import { useAuth } from "./context/AuthContext"; 
import Navbar from "./components/NavBar";
import Footer from "./components/Footer";

interface PrivateRouteProps {
	children: React.ReactElement;
}
const PrivateRoute = ({ children }: PrivateRouteProps) => {
	const { isLoggedIn } = useAuth(); // Używam kontekstu, aby sprawdzić, czy użytkownik jest zalogowany
	return isLoggedIn ? children : <Navigate to='/login' />;
};

const AppRoutes = () => {
	return (
		<Router>
			<Navbar />
			<Routes>
				<Route path='/login' element={<LoginPage />} />
				<Route path='/' element={<LoginPage />} />
				<Route
					path='/photos'
					element={<PrivateRoute>{<PhotoFeed />}</PrivateRoute>}
				/>
				<Route
					path='/user'
					element={<PrivateRoute>{<UserPage />}</PrivateRoute>}
				/>
				<Route
					path='/search-users'
					element={<PrivateRoute>{<UserSearch />}</PrivateRoute>}
				/>
				<Route
					path='/search-photos'
					element={<PrivateRoute>{<PhotoSearch />}</PrivateRoute>}
				/>
				<Route
					path='/posts'
					element={<PrivateRoute>{<PostsPage />}</PrivateRoute>}
				/>
			</Routes>
			<Footer />
		</Router>
	);
};

export default AppRoutes;
