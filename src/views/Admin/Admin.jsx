import React, { useContext, useEffect, useState } from 'react'
import "./Admin.css";
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { getUsers } from '../../services/userApiCalls';

export const Admin = () => {
    const [users, setUsers] = useState([]);
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
        bringAllUsers();
    }, [navigate, token]);

    const deleteUserHandler = async (e) => {
        if (!token) {
            alert('No estás autorizado para realizar esta acción.');
            navigate('/login');
            return;
        }
        const id = +e.target.name;
        const res = await deleteUserById(token, id);
        if (res.success) {
            const remainingUsers = users.filter((user) => user.id !== id);
            setUsers(remainingUsers);
        } else {
            alert('Error al eliminar el usuario. Verifica tu sesión.');
        }
    };

  return (
    <>
        <h1>Admin</h1>
        <table>
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
                                        <button type="button" name={user._id} onClick={deleteUserHandler}>Delete</button>
                                    </td>
                                </tr>
                            )))
                            : (
                                <tr>
                                    <td>
                                        No users found.
                                    </td>
                                </tr>
                            )}
                    </tbody>
                </table>
    </>
);
};