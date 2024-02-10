// src/components/PostsPage.tsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import UserDetails from "./UserDetails";
import { useAuth } from "../context/AuthContext";

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
	postId?: number; // Powiązanie z postem
	userId: number;
}

const PostsPage = () => {
	const [posts, setPosts] = useState<Post[]>([]);
	const [newPostTitle, setNewPostTitle] = useState("");
	const [newPostBody, setNewPostBody] = useState("");
	const [newCommentBody, setNewCommentBody] = useState("");
	const [commentPostId, setCommentPostId] = useState<number | null>(null);
	const {
		currentUserId,
		userPosts,
		addUserPost,
		userDetails,
		removeUserPost,
		addUserComment,
		removeUserComment,
		userComments,
	} = useAuth();

	useEffect(() => {
		const fetchPostsAndComments = async () => {
			const postsResponse = await axios.get(
				"https://jsonplaceholder.typicode.com/posts"
			);
			const postsData: Post[] = postsResponse.data;

			const commentsPromises = postsData.map(post =>
				axios.get(
					`https://jsonplaceholder.typicode.com/posts/${post.id}/comments`
				)
			);
			const commentsResponses = await Promise.all(commentsPromises);
			const postsWithAPIComments = postsData.map((post, index) => ({
				...post,
				comments: commentsResponses[index].data,
			}));


			// Tutaj integruje komentarze użytkownika z postami
			const postsWithAllComments = postsWithAPIComments.map(post => ({
				...post,
				comments: [
					...(post.comments || []),
					...userComments.filter(comment => comment.postId === post.id),
				],
			}));

			setPosts([...userPosts, ...postsWithAllComments]);
		};

		fetchPostsAndComments();
	}, [userPosts, userComments]); // Dodanie userComments do zależności, aby reintegrować komentarze za każdym razem, gdy się zmienią

	useEffect(() => {
		const updatePostsWithComments = () => {
			const updatedPosts = userPosts.map(post => {
				const filteredComments = userComments.filter(
					comment => comment.postId === post.id
				);
				return { ...post, comments: filteredComments };
			});

			setPosts([...updatedPosts]);
		};

		updatePostsWithComments();
	}, [userPosts, userComments]); // Nasłuchiwanie na zmiany w userPosts i userComments

	const handleAddNewPost = () => {
		if (!userDetails) return; // Upewniam się, że mam dane użytkownika

		const newPost = {
			userId: userDetails.id,
			id: Date.now(), // Używam timestamp jako symulacji ID
			title: newPostTitle,
			body: newPostBody,
			comments: [],
		};
		addUserPost(newPost); // Dodaje post do stanu globalnego
		setNewPostTitle("");
		setNewPostBody("");
	};
	const handleAddComment = (postId: number) => {
		if (!userDetails) return; // Upewniam się, że użytkownik jest zalogowany

		const newComment = {
			id: Date.now(), // Symulacja unikalnego ID
			body: newCommentBody,
			postId: postId, // Dodaje powiązanie z postem
			userId: userDetails.id, // Ustaw userId zalogowanego użytkownika
		};

		addUserComment(newComment); // Dodaje komentarz do kontekstu
		setPosts(
			posts.map(post => {
				if (post.id === postId) {
					const updatedComments = [...(post.comments || []), newComment];
					return { ...post, comments: updatedComments };
				}
				return post;
			})
		);
		setNewCommentBody("");
		setCommentPostId(null); // Resetuje ID posta po dodaniu komentarza
	};

	const handleDeletePost = (postId: number) => {
		removeUserPost(postId); // Usuwam post z kontekstu
		setPosts(posts.filter(post => post.id !== postId)); // Usuwam post z lokalnego stanu
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
		removeUserComment(commentId);
	};

	return (
		<div>
			<h2>Dodaj nowy post</h2>
			<input
				value={newPostTitle}
				onChange={e => setNewPostTitle(e.target.value)}
				placeholder='Tytuł posta'
			/>
			<textarea
				value={newPostBody}
				onChange={e => setNewPostBody(e.target.value)}
				placeholder='Treść posta'
			/>
			<button onClick={handleAddNewPost}>Dodaj post</button>

			<h2>Posty</h2>
			{posts.map(post => (
				<div key={post.id}>
					<h3>{post.title}</h3>
					<p>{post.body}</p>
					<UserDetails userId={post.userId} />
					{userDetails?.id === post.userId && (
						<button onClick={() => handleDeletePost(post.id)}>Usuń post</button>
					)}
					<div>
						Komentarze:
						{post.comments?.map(comment => (
							<div key={comment.id}>
								<p>{comment.body}</p>
								{comment.userId === currentUserId && (
									<button
										onClick={() => handleDeleteComment(post.id, comment.id)}>
										Usuń komentarz
									</button>
								)}
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
