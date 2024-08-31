import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getPostById, putLikeById } from '../../services/postApiCalls';
import { useAuth } from '../../contexts/AuthContext';

export const PostDetail = () => {
  const [post, setPost] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();
  const { passport } = useAuth();

  useEffect(() => {
    const fetchPost = async () => {
      if (!passport || !passport.token) {
        navigate('/login');
        return;
      }
      try {
        setIsLoading(true);
        const response = await getPostById(id, passport.token);
        if (response.success) {
          setPost(response.data);
        } else {
          console.error("Error fetching post:", response.message);
        }
      } catch (error) {
        console.error("Error fetching post:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPost();
  }, [id, passport, navigate]);

  const handleLike = async () => {
    try {
      const response = await putLikeById(post._id, passport.token);
      if (response.success) {
        setPost(prevPost => ({ ...prevPost, like: response.data.like }));
      } else {
        console.error("Error liking post:", response.message);
      }
    } catch (error) {
      console.error("Error liking post:", error);
    }
  };

  if (isLoading) {
    return <p>Loading post...</p>;
  }

  if (!post) {
    return <p>Post not found</p>;
  }

  return (
    <div>
      <h1>Post Detail</h1>
      <h3>Posted by: {post.userId?.email || 'Unknown User'}</h3>
      <p>{post.description}</p>
      <button onClick={handleLike}>Like</button>
      <span>Likes: {post.like ? post.like.length : 0}</span>
    </div>
  );
};