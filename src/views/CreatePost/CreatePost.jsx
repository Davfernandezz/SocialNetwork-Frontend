import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import "./CreatePost.css";
import { CInput } from '../../components/CInput/CInput';

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
        console.log(e.target.name);
        setNewPost({
            ...newPost,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async () => {
        try {
            const response = await createPost(newPost, passport.token);
            if (response.success) {
                navigate("/profile");
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
                    <CInput type="text" value={newPost.description} placeholder='description' emitFunction={inputHandler} />
                        <br />
                        <input type="button" value="Confirm" onClick={handleSubmit} />   
                    </div>
                </div>
            </div>
        </div>
    );
};