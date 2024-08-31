import React from 'react'
import { useNavigate } from 'react-router-dom';
import './CSurfer.css';

export const CSurfer = ({
    content,
    path
}) => {
    const navigate = useNavigate();

    return (
        <div className="csurfer" onClick={() => navigate(path)}>{content}</div>
    )
}
