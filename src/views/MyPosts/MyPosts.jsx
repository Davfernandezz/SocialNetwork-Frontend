import React, { useEffect, useState } from 'react'
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { deletePostById } from '../../services/postApiCalls';

export const MyPosts = () => {

    const [posts, setPosts] = useState([]);
    const navigate = useNavigate();
    const { passport } = useAuth();
    const token = passport ? passport.token : null;

    const formatDate = (isoDate) => {
        const date = new Date(isoDate);
        return date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
        });
    };

    useEffect(() => {
        if (!token) {
            navigate('/login');
            return;
        }
        
        const bringMyPosts = async () => {
            const MyPosts = await getMyPosts(token);
            if (MyPosts.success) {
                setPosts(MyPosts.data);
            } else {
                navigate('/login');
            }
        };

        bringMyPosts();

    }, [navigate, token]);

    const deletePostHandler = async (e) => {
        if (!token) {
            alert('You are not authorized to perform this action');
            navigate('/login');
            return;
        }
        const id = e.target.name;
        const res = await deletePostById(token, id);
        if (res.success) {
            const remainingPosts = posts.filter((post) => post._id !== id);
            setPosts(remainingPosts);
        } else {
            alert('Error deleting post. Verify your session');
        }
    };

  return (
    <>
           <h1>My posts dashboard</h1>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Description</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {posts.length ? (
                        posts.map((post) => (
                            <tr key={post._id}>
                                <td>{post._id}</td>
                                <td>{post.description || 'Not available'}</td>
                                <td>
                                    <button type="button" name={post._id} onClick={deletePostHandler}>Delete</button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td>No posts found.</td>
                        </tr>
                    )}
                </tbody>
            </table>
            </>
  )
}
