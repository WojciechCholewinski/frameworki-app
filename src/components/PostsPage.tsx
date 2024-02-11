// src/components/PostsPage.tsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import UserDetails from "./UserDetails";
import { useAuth } from "../context/AuthContext";
import styled from "styled-components";

const PageContainer = styled.div`
	padding: 20px;
	background-color: #f9f9f9;
	width: 60%; // Ustawienie szerokości na 70%
	margin: auto; // Wyśrodkowanie kontenera
`;

const HeaderContainer = styled.div`
	text-align: center;
	margin-bottom: 20px;
`;

// Style dla postów
const PostContainer = styled.div`
	background-color: #fff;
	border-radius: 8px;
	box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
	margin-bottom: 20px;
	padding: 20px;
	transition: box-shadow 0.3s ease-in-out;

	&:hover {
		box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
	}
`;

const PostTitle = styled.h3`
	color: #007bff;
	margin-bottom: 10px;
`;

const PostBody = styled.p`
	line-height: 1.6;
`;

// Style dla komentarzy
const CommentContainer = styled.div`
	background-color: #f0f0f0;
	border-radius: 5px;
	padding: 10px;
	margin-top: 10px;
`;

const CommentBody = styled.p`
	margin: 0;
	font-size: 0.9rem;
`;

// Style dla przycisków
const Button = styled.button`
	padding: 5px 10px;
	background-color: #007bff;
	color: #fff;
	border: none;
	border-radius: 4px;
	cursor: pointer;
	transition: background-color 0.2s;

	&:hover {
		background-color: #0056b3;
	}

	&:not(:last-child) {
		margin-right: 10px;
	}
`;

const Input = styled.input`
	width: 100%;
	padding: 10px;
	margin: 10px 0;
	border-radius: 4px;
	border: 1px solid #ccc;
`;

const Textarea = styled.textarea`
	width: 100%;
	padding: 10px;
	margin: 10px 0;
	border-radius: 4px;
	border: 1px solid #ccc;
	height: 100px;
`;

const CommentsSection = styled.div`
	margin-top: 20px;
`;

const ButtonContainer = styled.div`
	text-align: right;
	margin-top: 0px; // Dodaje trochę miejsca nad przyciskami
`;

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
	const [isFormVisible, setIsFormVisible] = useState(false);

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
		<PageContainer>
			<HeaderContainer>
				<h2 style={{ textAlign: "center" }}>Posty</h2>

				<Button onClick={() => setIsFormVisible(!isFormVisible)}>
					Dodaj nowy post
				</Button>
			</HeaderContainer>

			{isFormVisible && (
				<>
					<Input
						value={newPostTitle}
						onChange={e => setNewPostTitle(e.target.value)}
						placeholder='Tytuł posta'
					/>
					<Textarea
						value={newPostBody}
						onChange={e => setNewPostBody(e.target.value)}
						placeholder='Treść posta'
					/>
					<Button onClick={handleAddNewPost}>Dodaj post</Button>
					<br />
					<br />
				</>
			)}

			{posts.map(post => (
				<PostContainer key={post.id}>
					<UserDetails userId={post.userId} />
					<PostTitle>{post.title}</PostTitle>
					<PostBody>{post.body}</PostBody>
					{userDetails?.id === post.userId && (
						<ButtonContainer>
							<Button onClick={() => handleDeletePost(post.id)}>
								Usuń post
							</Button>
						</ButtonContainer>
					)}
					<CommentsSection>
						Komentarze:
						{post.comments?.map(comment => (
							<CommentContainer key={comment.id}>
								<CommentBody>{comment.body}</CommentBody>
								{comment.userId === currentUserId && (
									<ButtonContainer>
										<Button
											onClick={() => handleDeleteComment(post.id, comment.id)}>
											Usuń komentarz
										</Button>
									</ButtonContainer>
								)}
							</CommentContainer>
						))}
						{commentPostId === post.id ? (
							<>
								<Textarea
									value={newCommentBody}
									onChange={e => setNewCommentBody(e.target.value)}
									placeholder='Dodaj komentarz'
								/>
								<Button onClick={() => handleAddComment(post.id)}>Dodaj</Button>
							</>
						) : (
							<Button onClick={() => setCommentPostId(post.id)}>
								Dodaj komentarz
							</Button>
						)}
					</CommentsSection>
				</PostContainer>
			))}
		</PageContainer>
	);
};
export default PostsPage;
