import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import "./CreatePost.css";
import { createPost } from '../../services/postApiCalls';

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
        <div>
            <h1>CreatePost</h1>
            <div>
                <div>
                    <br />
                    <h3>Share your daily life with others😊</h3>
                    <div>
                        <textarea
                            value={newPost.description}
                            name="description"
                            placeholder="description"
                            onChange={(e) => inputHandler(e)}
                        />
                        <br />
                        <input type="button" value="Confirm" onClick={handleSubmit} />
                    </div>
                </div>
            </div>
        </div>
    );
};