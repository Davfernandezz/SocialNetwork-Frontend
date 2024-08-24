import React from 'react';
import "./NotFound.css";

export const NotFound = () => {
  return (
    <div className="notfound-wrapper">
      <div className="notfound-container">
        <h1 className="notfound-title">404</h1>
        <p className="notfound-message">Page Not Found</p>
        <p className="notfound-description">
        Sorry, the page you are looking for does not exist. 
        </p>
        <a href="/" className="notfound-link">Back to Home</a>
      </div>
    </div>
  );
};