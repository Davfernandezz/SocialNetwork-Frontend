import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { deleteUserById, getUsers } from '../../services/userApiCalls';
import { deletePostById, getAllPosts } from '../../services/postApiCalls';
import "./Admin.css";

export const Admin = () => {
    const [users, setUsers] = useState([]);
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
        const bringAllUsers = async () => {
            const allUsers = await getUsers(token);
            if (allUsers.success) {
                setUsers(allUsers.data);
            } else {
                navigate('/login');
            }
        };

        const bringAllPosts = async () => {
            const allPosts = await getAllPosts(token);
            if (allPosts.success) {
                setPosts(allPosts.data);
            } else {
                navigate('/login');
            }
        };

        bringAllUsers();
        bringAllPosts();

    }, [navigate, token]);

    const deleteUserHandler = async (e) => {
        if (!token) {
            alert('You are not authorized to perform this action');
            navigate('/login');
            return;
        }
        const id = e.target.name;
        const res = await deleteUserById(token, id);
        if (res.success) {
            const remainingUsers = users.filter((user) => user._id !== id);
            setUsers(remainingUsers);
        } else {
            alert('Error al eliminar el usuario. Verifica tu sesión.');
        }
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

    return (
        <div className="admin-dashboard-wrapper">
          <div className="admin-dashboard-container">
            <h1>Admin Users Dashboard</h1>
            <div className="table-users-responsive">
              <table className="table table-users">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Creation Date</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.length ? (
                    users.map((user) => (
                      <tr key={user._id}>
                        <td>{user._id}</td>
                        <td>{user.name || 'Not available'}</td>
                        <td>{user.email}</td>
                        <td>{formatDate(user.createdAt)}</td>
                        <td>
                          <button
                            type="button"
                            name={user._id}
                            onClick={deleteUserHandler}
                            className="btn btn-delete"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="no-data">No users found.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
      
            <h1>Admin Posts Dashboard</h1>
            <div className="table-posts-responsive">
              <table className="table table-posts">
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
                          <button
                            type="button"
                            name={post._id}
                            onClick={deletePostHandler}
                            className="btn btn-delete"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="3" className="no-data">No posts found.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      );
    };