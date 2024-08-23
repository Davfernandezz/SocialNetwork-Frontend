import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { createPost } from '../../services/postApiCalls';
import "./CreatePost.css";

export const CreatePost = () => {
    const [newPost, setNewPost] = useState({
        description: ""
    });

    const { passport } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!passport || !passport.token) {
            navigate("/login");
        }
    }, [passport, navigate]);

    const inputHandler = (e) => {
        setNewPost({
            ...newPost,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async () => {
        try {
            const response = await createPost(newPost, passport.token);
            if (response.success) {
                navigate("/allPosts");
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="create-post-wrapper">
            <div className="create-post-container">
                <h1>Create Post</h1>
                <h3>Share your daily life with others ✍🏼</h3>
                <div className="form-container">
                    <textarea
                        value={newPost.description}
                        name="description"
                        placeholder="Description..."
                        onChange={(e) => inputHandler(e)}
                        className="form-control"
                    />
                    <input
                        type="button"
                        value="Confirm"
                        onClick={handleSubmit}
                        className="btn-confirm"
                    />
                </div>
            </div>
        </div>
    );
};