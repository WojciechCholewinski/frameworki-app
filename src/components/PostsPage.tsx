// src/components/PostsPage.tsx
import React, { useEffect, useState } from "react";
import axios from "axios";

interface Post {
	userId: number;
	id: number;
	title: string;
	body: string;
	comments?: Comment[];
}
interface Comment {
	id: number;
	body: string;
}

// const PostsPage = () => {
// 	const [posts, setPosts] = useState<Post[]>([]);
// 	const [newPostTitle, setNewPostTitle] = useState("");
// 	const [newPostBody, setNewPostBody] = useState("");

// 	const handleAddPost = () => {
// 		const newPost = {
// 			id: Math.random(), // Symulacja unikalnego ID, w prawdziwej aplikacji ID powinno pochodzić z backendu
// 			title: newPostTitle,
// 			body: newPostBody,
// 			userId: 1, // Zakładamy, że ID użytkownika jest znane lub pobierane z kontekstu autoryzacji
// 		};
// 		setPosts([newPost, ...posts]); // Dodajemy nowy post na początek listy
// 		// Opcjonalnie, wyczyść pola formularza po dodaniu postu
// 		setNewPostTitle("");
// 		setNewPostBody("");
// 	};

// 	const handleDeletePost = postId => {
// 		setPosts(posts.filter(post => post.id !== postId));
// 	};

// 	useEffect(() => {
// 		const fetchPosts = async () => {
// 			const response = await axios.get(
// 				"https://jsonplaceholder.typicode.com/posts"
// 			);
// 			setPosts(response.data);
// 		};

// 		fetchPosts();
// 	}, []);

// 	return (
// 		<div>
// 			<h2>Posty</h2>
// 			{/* Formularz dodawania postu */}
// 			<div>
// 				<input
// 					type='text'
// 					placeholder='Tytuł postu'
// 					value={newPostTitle}
// 					onChange={e => setNewPostTitle(e.target.value)}
// 				/>
// 				<textarea
// 					placeholder='Treść postu'
// 					value={newPostBody}
// 					onChange={e => setNewPostBody(e.target.value)}></textarea>
// 				<button onClick={handleAddPost}>Dodaj post</button>
// 			</div>
// 			{posts.map(post => (
// 				<div key={post.id}>
// 					<h3>{post.title}</h3>
// 					<p>{post.body}</p>
// 					{/* Miejsce na przyciski akcji */}
// 				</div>
// 			))}
// 		</div>
// 	);
// };

// export default PostsPage;

const PostsPage = () => {
	const [posts, setPosts] = useState<Post[]>([]);
	const [newCommentBody, setNewCommentBody] = useState<string>("");
	const [commentPostId, setCommentPostId] = useState<number | null>(null);

	useEffect(() => {
		const fetchPosts = async () => {
			const response = await axios.get(
				"https://jsonplaceholder.typicode.com/posts"
			);
			const postsWithComments = response.data.map((post: Post) => ({
				...post,
				comments: [],
			}));
			setPosts(postsWithComments);
		};

		fetchPosts();
	}, []);

	const handleAddComment = (postId: number) => {
		const newComment = {
			id: Math.random(), // Symulacja unikalnego ID
			body: newCommentBody,
		};
		setPosts(
			posts.map(post => {
				if (post.id === postId) {
					return { ...post, comments: [...(post.comments ?? []), newComment] };
				}
				return post;
			})
		);
		setNewCommentBody("");
		setCommentPostId(null); // Resetuj ID posta po dodaniu komentarza
	};

	const handleDeleteComment = (postId: number, commentId: number) => {
		setPosts(
			posts.map(post => {
				if (post.id === postId) {
					return {
						...post,
						comments:
							post.comments?.filter(comment => comment.id !== commentId) ?? [],
					};
				}
				return post;
			})
		);
	};

	return (
		<div>
			<h2>Posty</h2>
			{posts.map(post => (
				<div key={post.id}>
					<h3>{post.title}</h3>
					<p>{post.body}</p>
					<div>
						Komentarze:
						{post.comments?.map(comment => (
							<div key={comment.id}>
								<p>{comment.body}</p>
								<button
									onClick={() => handleDeleteComment(post.id, comment.id)}>
									Usuń komentarz
								</button>
							</div>
						))}
						{commentPostId === post.id ? (
							<>
								<textarea
									value={newCommentBody}
									onChange={e => setNewCommentBody(e.target.value)}
									placeholder='Dodaj komentarz'></textarea>
								<button onClick={() => handleAddComment(post.id)}>Dodaj</button>
							</>
						) : (
							<button onClick={() => setCommentPostId(post.id)}>
								Dodaj komentarz
							</button>
						)}
					</div>
				</div>
			))}
		</div>
	);
};

export default PostsPage;
