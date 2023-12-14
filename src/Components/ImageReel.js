import React, { useState } from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './ImageReel.css';
import img1 from './Pic1.jpg';
import img2 from './Pic2.jpg';
import img3 from './Pic3.jpg';
import img4 from './Pic4.jpg';

const ImageReel = () => {
  const [showPreview, setShowPreview] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);

  const images = [
    img1,
    img2,
    img3,
    img4
  ];

 const captions = [
  {
    caption: 'Got a foam cannon? Throw your favorite shampoo or pre-wash foam in an Ethos Foam Cannon and enjoy! \n\nWe’re using Ceramic Shampoo today!',
    username: 'ethoscarcare',
    description: '@ethoscarcare',
    date: 'August 8'
  },
  {
    caption: 'Restore your faded trim back to that deep, rich factory-black with Graphene Shine!\n\nIt’s great for all of your trim, plastics, and tires! It’s super easy to use & works like magic!',
    username: 'ethoscarcare',
    description: '@ethoscarcare',
    date: 'August 6' 
  },
  {
    caption: 'Our Graphene Matrix Coating V2.0 has it all!\n\n✅Increased durability, slickness, and high gloss\n✅Resistance to water spotting and staining\n✅Quicker application\n\nUpgrade your car’s protection with Graphene Matrix and keep it looking its best for longer!',
    username: 'ethoscarcare',
    description: '@ethoscarcare',
    date: 'August 2'
  },
  {
    caption: 'ENDING SOON! 🔴 Last chance to save 20% across our ENTIRE store!\n\nEnd the weekend with your favorite Ethos products on their way to your door!',
    username: 'ethoscarcare',
    description: '@ethoscarcare',
    date: 'July 31'
  },
];


const openPreview = (index) => {
    setSelectedImageIndex(index);
    setShowPreview(true);
  };

  const closePreview = () => {
    setSelectedImageIndex(null);
    setShowPreview(false);
  };

  const goToNextImage = () => {
    const nextIndex = (selectedImageIndex + 1) % images.length;
    setSelectedImageIndex(nextIndex);
  };

  const goToPreviousImage = () => {
    const prevIndex = (selectedImageIndex - 1 + images.length) % images.length;
    setSelectedImageIndex(prevIndex);
  };

  return (
    <div className="image-reel-container">
      {showPreview && <div className="dimmed-background" onClick={closePreview} />}
      {images.map((image, index) => (
        <div
          key={index}
          className="image-item"
          onClick={() => openPreview(index)}
        >
           <img
            src={image}
            alt={` ${index}`}
            className="image"
          />
          <div className="overlay">
            <i className="fab fa-instagram instagram-logo" />
          </div>
        </div>
      ))}
      {showPreview && (
        <div className="preview-popup">
          <div className="image-preview">
            <img
              src={images[selectedImageIndex]}
              alt="Preview"
              className="preview-image"
            />
          </div>
          <div className="preview-content">
            <div className="preview-user">
             
             <div className='Details'>
              <div className="avatar">
                <i className="fab fa-instagram" />
              </div>
              <div className="username">
                <a href="/#">{captions[selectedImageIndex].username}</a>
                <div className="description">
                <a href="/#">{captions[selectedImageIndex].description}</a>
                </div>
              </div>
              </div>
              
              <div className="close-button" onClick={closePreview}>
                    &times;
              </div>
            </div>

            <div className='bodyContainer'>
            <div className='buttons'>
            <button className="nav-button prev-button" onClick={goToPreviousImage}>
              <i className="fas fa-angle-left" style={{ color: 'grey', fontSize: '20px' }} />
            </button>
            <button className="nav-button next-button" onClick={goToNextImage}>
              <i className="fas fa-angle-right" style={{ color: 'grey', fontSize: '20px' }} />
            </button>
            </div>

            <div className="caption">
              {captions[selectedImageIndex].caption}
            </div>
            </div>

            <div className='footer'>
            <div className="date">
              {captions[selectedImageIndex].date}
            </div>

            <div className="view-instagram">
              <a href={`https://www.instagram.com/${captions[selectedImageIndex].username}/`} target="_blank" rel="noopener noreferrer">
                View on Instagram
              </a>
            </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageReel;