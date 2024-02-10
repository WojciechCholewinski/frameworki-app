// src/context/AuthContext.tsx
import React, { createContext, useContext, useState, ReactNode } from "react";
interface User {
	id: number;
	name: string;
	username: string;
	email: string;
}

interface Post {
	userId: number;
	id: number;
	title: string;
	body: string;
	comments?: Comment[];
}

// interface UserComment {
// 	postId: number;
// 	id: number;
// 	body: string;
// }
interface Comment {
	postId?: number;
	id: number;
	body: string;
	userId: number;
}

interface UserPhoto {
	id: number;
	thumbnailUrl: string;
	title: string;
	userId: number;
	isOwner: boolean;
}

interface AuthContextType {
	currentUserId: number | null; // Aktualny unikalny użytkownik
	isLoggedIn: boolean;
	userDetails: User | null;
	userPosts: Post[];
	userComments: Comment[];
	userPhotos: UserPhoto[];

	login: (username: string, password: string) => void;
	logout: () => void;
	setUserDetails: (user: User) => void;
	addUserPost: (post: Post) => void;
	removeUserPost: (postId: number) => void; 
	addUserComment: (comment: Comment) => void;
	removeUserComment: (commentId: number) => void;
	addUserPhoto: (photo: UserPhoto) => void;
	removeUserPhoto: (photoId: number) => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(
	undefined
);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
	children,
}) => {
	const [currentUserId, setCurrentUserId] = useState<number | null>(null); // Inicjalizacja stanu currentUserId
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [userDetails, setUserDetails] = useState<User | null>(null);
	const [userPosts, setUserPosts] = useState<Post[]>([]);
	const [userComments, setUserComments] = useState<Comment[]>([]);
	const [userPhotos, setUserPhotos] = useState<UserPhoto[]>([]); // Przeniesienie stanu do wnętrza komponentu

	const login = (username: string, password: string) => {
		// Prosta logika weryfikacji
		if (username === "login" && password === "1234") {
			setCurrentUserId(2137); // Ustawienie currentUserId na 2137 dla demonstracji
			setIsLoggedIn(true);
			setUserDetails({
				id: 2137,
				name: "Jan Kowalski",
				username: "jankowalski",
				email: "jan@example.com",
			});
		} else {
			alert("Niepoprawny login lub hasło");
			// Dodatkowa logika, np. czyszczenie formularza
		}
	};

	const logout = () => {
		setCurrentUserId(null);
		setIsLoggedIn(false);
		setUserDetails(null);
		setUserPosts([]);
		setUserComments([]);
		setUserPhotos([]);
	};

	const addUserPost = (post: Post) => {
		setUserPosts(prevPosts => [post, ...prevPosts]);
	};

	const removeUserPost = (postId: number) => {
		setUserPosts(prevPosts => prevPosts.filter(post => post.id !== postId));
	};

	const addUserComment = (comment: Comment) => {
		setUserComments(prevComments => [...prevComments, comment]);
		// Dodaj komentarz do odpowiedniego posta w userPosts
		setUserPosts(prevPosts =>
			prevPosts.map(post => {
				if (post.id === comment.postId) {
					return { ...post, comments: [...(post.comments || []), comment] };
				}
				return post;
			})
		);
	};

	const removeUserComment = (commentId: number) => {
		setUserComments(prevComments =>
			prevComments.filter(comment => comment.id !== commentId)
		);
		// Aktualizacja postów, aby usunąć komentarz z odpowiedniego posta
		setUserPosts(prevPosts =>
			prevPosts.map(post => {
				const filteredComments =
					post.comments?.filter(comment => comment.id !== commentId) || [];
				return { ...post, comments: filteredComments };
			})
		);
	};

	const addUserPhoto = (photo: UserPhoto) => {
		setUserPhotos(prevPhotos => [photo, ...prevPhotos]);
	};

	const removeUserPhoto = (photoId: number) => {
		setUserPhotos(prevPhotos =>
			prevPhotos.filter(photo => photo.id !== photoId)
		);
	};

	return (
		<AuthContext.Provider
			value={{
				isLoggedIn,
				userDetails,
				userPosts,
				userComments,
				userPhotos,
				currentUserId,

				login,
				logout,
				setUserDetails,
				addUserPost,
				removeUserPost,
				addUserComment,
				removeUserComment,
				addUserPhoto,
				removeUserPhoto,
			}}>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error("useAuth must be used within an AuthProvider");
	}
	return context;
};
