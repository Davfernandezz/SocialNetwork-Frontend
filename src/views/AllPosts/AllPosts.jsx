import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { getAllPosts, putLikeById } from '../../services/postApiCalls';
import { useAuth } from '../../contexts/AuthContext';
import "./AllPosts.css";

export const AllPosts = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { passport } = useAuth();

  const fetchPosts = async () => {
    if (!passport || !passport.token) {
      navigate('/login');
      return;
    }
    try {
      setIsLoading(true);
      const response = await getAllPosts(passport.token);
      if (response.success) {
        setPosts(response.data.map(post => ({
          ...post,
          like: Array.isArray(post.like) ? post.like : []
        })));
      } else {
        console.error("Error fetching posts:", response.message);
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [passport, navigate]);

  const handleLike = async (postId) => {
    try {
      const response = await putLikeById(postId, passport.token);
      if (response.success) {
        setPosts(prevPosts => prevPosts.map(post => 
          post._id === postId ? { ...post, like: response.data.like } : post
        ));
      } else {
        console.error("Error liking post:", response.message);
      }
    } catch (error) {
      console.error("Error liking post:", error);
    }
  };

  if (isLoading) {
    return <p>Loading posts...</p>;
  }

  return (
    <div className="posts-wrapper">
      <h1>All Posts</h1>
      {posts.length === 0 ? (
        <div className="no-posts-wrapper">
          <div className="no-posts-container">
            <p className="no-posts-message">No posts found...</p>
            <p className="create-post-message">Why not create one?</p>
            <Link to="/createPost" className="create-post-link">Create Post</Link>
          </div>
        </div>
      ) : (
        <div className="posts-container">
          {posts.map((post) => (
            <div key={post._id} className="post-card">
              <div className="post-user">Posted by: {post.userId?.email || 'Unknown User'}</div>
              <Link to={`/postDetail/${post._id}`} className="post-link">
                <div className="description-posts">{post.description}</div>
              </Link>
              <button onClick={() => handleLike(post._id)} className="btn-like">
                Like
              </button>
              <span className="post-likes">Likes: {post.like ? post.like.length : 0}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}