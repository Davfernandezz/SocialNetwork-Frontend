import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllPosts, putLikeById } from '../../services/postApiCalls';
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

  const handleLike = async (postId) => {
    try {
      const response = await putLikeById(postId, passport.token);
      if (response.success) {
        setPosts(posts.map(post => {
          if (post._id === postId) {
            const updatedLikes = post.like.includes(passport.userId)
              ? post.like.filter(id => id !== passport.userId)
              : [...post.like, passport.userId];
            return { ...post, like: updatedLikes };
          }
          return post;
        }));
      } else {
        console.error("Error toggling like:", response.message);
      }
    } catch (error) {
      console.error("Error toggling like:", error);
    }
  };

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
              <button onClick={() => handleLike(post._id)}>
                {post.like && post.like.includes(passport.userId) ? 'Unlike' : 'Like'}
              </button>
              <span>Likes: {post.like ? post.like.length : 0}</span>
            </div>
          ))}
        </div>
      )}
    </>
  );
};