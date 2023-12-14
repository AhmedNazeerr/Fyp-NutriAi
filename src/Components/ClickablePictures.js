import React from 'react';
import './ClickablePictures.css'; // Create a CSS file for styling

const ClickablePictures = () => {
  return (
    <div className="image-grid">
      <div className="image-container">
        <img src="./assets/Picture1.webp" alt="1" className="imageCP" />
        <div className="image-overlay">
          <h2 className="image-title">Image 1 Title</h2>
        </div>
      </div>
      <div className="image-container">
        <img src="./assets/Picture2.webp" alt="2" className="imageCP" />
        <div className="image-overlay">
          <h2 className="image-title">Image 2 Title</h2>
        </div>
      </div>
    </div>
  );
};

export default ClickablePictures;
