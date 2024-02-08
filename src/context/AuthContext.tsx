// src/context/AuthContext.tsx
import React, { createContext, useContext, useState, ReactNode } from "react";
//import { useNavigate } from "react-router-dom"; // Importujemy useNavigate

interface AuthContextType {
	isLoggedIn: boolean;
	login: (username: string, password: string) => void;
	logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);
// Definicja AuthProviderProps tutaj
interface AuthProviderProps {
	children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	//const navigate = useNavigate(); // Używamy useNavigate

	const login = (username: string, password: string) => {
		// Prosta logika weryfikacji
		if (username === "login" && password === "1234") {
			setIsLoggedIn(true);
		} else {
			alert("Niepoprawny login lub hasło");
			// Tutaj można dodać dodatkową logikę, np. czyszczenie formularza
		}
	};

	const logout = () => {
		setIsLoggedIn(false);
	};

	return (
		<AuthContext.Provider value={{ isLoggedIn, login, logout }}>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => {
	const context = useContext(AuthContext);
	if (context === undefined) {
		throw new Error("useAuth must be used within an AuthProvider");
	}
	return context;
};
