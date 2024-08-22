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
    <div>MyPosts</div>
  )
}
