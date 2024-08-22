import React, { useEffect, useState } from 'react'
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { deletePostById, getMyPosts } from '../../services/postApiCalls';

export const MyPosts = () => {
    const [posts, setPosts] = useState([]);
    const [editposts, setEditposts] = useState({
        description: "",
    });
    const [editting, setEditing] = useState(false);
    const [currentEditId, setCurrentEditId] = useState(null);
    const navigate = useNavigate();
    const { passport } = useAuth();
    const token = passport ? passport.token : null;

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

    const editInputHandler = (e) => {
        setEditposts({
            ...editposts,
            [e.target.name]: e.target.value
        });
    };

    const editButtonHandler = (post) => {
        setEditposts({
            description: post.description,
        });
        setCurrentEditId(post._id);
        setEditing(true);
    };

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

    const confirmButtonHandler = async () => {
        const token = passport.token;
        const response = await updateProfile(editposts, token);
        if (response.success) {
            const newData = await getUserProfile(token);
            setProfileData(newData.data);
            setEditing(false);
            setCurrentEditId(null);
        }
    };

    return (
        <>
            <h1>My posts dashboard</h1>
            {posts.length ? (
                <table>
                    <thead>
                        <tr>
                            <th>Description</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {posts.map((post) => (
                            <tr key={post._id}>
                                <td>
                                    {currentEditId === post._id && editting ? (
                                        <input
                                            type="text"
                                            name="description"
                                            value={editposts.description}
                                            onChange={editInputHandler}
                                        />
                                    ) : (
                                        post.description || 'Not available'
                                    )}
                                </td>
                                <td>
                                    {currentEditId === post._id && editting ? (
                                        <button type="button" onClick={confirmButtonHandler}>Save</button>
                                    ) : (
                                        <button type="button" onClick={() => editButtonHandler(post)}>Edit</button>
                                    )}
                                    <button type="button" name={post._id} onClick={deletePostHandler}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No posts found.</p>
            )}
        </>
    );
};