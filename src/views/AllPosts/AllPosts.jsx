import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllPosts } from '../../services/postApiCalls';
import { useAuth } from '../../contexts/AuthContext';

export const AllPosts = () => {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();
  const { passport } = useAuth();

  useEffect(() => {
    if (!passport || !passport.token) {
      navigate('/login'); 
      return; 
    }
    const bringAllPosts = async () => {
      try {
        const response = await getAllPosts(passport.token);
        if (response.success) {
          setPosts(response.data);
        } else {
          console.error("Error fetching posts:", response.message);
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    bringAllPosts();
  }, [passport, navigate]);

  return (
    <>
      <h1>All Posts</h1>
      {posts.length === 0 ? (
        <p>No posts found...</p>
      ) : (
        <div>
          {posts.map((post) => (
            <div key={post._id}>
              <div>{post.description}</div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};
