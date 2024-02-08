// src/App.tsx
import React from "react";
import AppRoutes from "./AppRoutes";
import { AuthProvider } from "./context/AuthContext"; // Upewnij się, że ścieżka jest poprawna

function App() {
	return (
		<div className='App'>
			<AuthProvider>
				<AppRoutes />
			</AuthProvider>
		</div>
	);
}

export default App;
