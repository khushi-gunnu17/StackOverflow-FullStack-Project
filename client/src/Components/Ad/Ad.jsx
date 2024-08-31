// Ad.jsx
import React from 'react';
import './Ad.css'; // Ensure this file exists and contains relevant styles

function Ad({ brandName, imageUrl, link }) {
    return (
        <div 
            className="ad-container" 
            style={{ backgroundImage: `url(${imageUrl})` }}
        >
            <a href={link} target="_blank" rel="noopener noreferrer" className="ad-link">
                <div className="ad-content">
                    <div className='ad-text'>
                        <h2 className="ad-title">{`Refreshing ${brandName}`}</h2>
                        <p className="ad-subtitle">Open Happiness with every sip!</p>
                    </div>
                    <button className="shop-button">Shop Now</button>
                </div>
            </a>
        </div>
    );
}

export default Ad;
