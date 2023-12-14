import React from 'react';
import './SubCat.css';

const SubCat = ({ images, categories }) => {
  return (
    <div className="container">
      <div className="column1">
        {images.map((image, index) => (
          <img
            key={`image-${index}`}
            src={image}
            alt={`${index}`}
            className="clickable-image"
          />
        ))}
      </div>
      <div className="column">
        {categories.map((category, index) => (
          <div
            key={`category-${index}`}
            className="clickable-category"
          >
            {category}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SubCat;
