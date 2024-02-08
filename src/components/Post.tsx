// // src/components/Post.tsx
// import React, { useEffect, useState } from "react";
// import axios from "axios";

// interface User {
// 	id: number;
// 	name: string;
// 	username: string;
// 	email: string;
// }

// interface PostProps {
// 	post: Post; // Zakładamy, że Post to wcześniej zdefiniowany interfejs
// }

// const Post: React.FC<PostProps> = ({ post }) => {
// 	const [user, setUser] = useState<User | null>(null);

// 	useEffect(() => {
// 		const fetchUser = async () => {
// 			const response = await axios.get<User>(
// 				`https://jsonplaceholder.typicode.com/users/${post.userId}`
// 			);
// 			setUser(response.data);
// 		};

// 		fetchUser();
// 	}, [post.userId]);

// 	return (
// 		<div>
// 			<h3>{post.title}</h3>
// 			<p>{post.body}</p>
// 			{user && (
// 				<p>
// 					Autor: {user.name} ({user.username})
// 				</p>
// 			)}
// 		</div>
// 	);
// };

// export default Post;
