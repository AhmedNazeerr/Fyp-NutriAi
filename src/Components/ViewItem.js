import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import "./ViewItem.css"; // Import your CSS file for styling

const ViewItem = ({ productData }) => {
  const [qtyCount, setQtyCount] = useState(1);
  const [isMobileView, setIsMobileView] = useState(window.innerWidth <= 768);
  // const [isTabView, setTabView] = useState(window.innerWidth <= 768);
  const { images, name, ratings, price, productCode, stockStatus } =
    productData;

  // State to keep track of the selected image
  const [selectedImage, setSelectedImage] = useState(images[0]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [isMobileView]);

  useEffect(() => {
    if (qtyCount < 0) {
      setQtyCount(0);
    }
  }, [qtyCount]);

  const prevImage = () => {
    var currentIndex = images.indexOf(selectedImage);
    if (currentIndex > 0) {
      var previousImage = images[currentIndex - 1];
      setSelectedImage(previousImage);
    }
  };

  const nextImage = () => {
    var currentIndex = images.indexOf(selectedImage);
    if (currentIndex < images.length - 1) {
      var nextImage = images[currentIndex + 1];
      setSelectedImage(nextImage);
    }
  };

  return (
    <>
      {isMobileView ? (
        <div className="product-viewer2">
          <div className="product-details">
            <div className="big-image-container2">
              <img
                src={selectedImage}
                alt="Selected Product"
                className="big-image2"
              />
            </div>
          </div>
          <div className="image-row">
            {images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Product ${index}`}
                className={selectedImage === image ? "selected" : ""}
                onClick={() => setSelectedImage(image)}
              />
            ))}
          </div>
          <div className="detailsVI">
            <h2>{name}</h2>
            <div className="ratingsVI">
              {/* Display stars and total reviews */}
              <span className="stars">★★★★★</span>
              <span className="total-reviewsVI">{ratings.reviews} reviews</span>
            </div>
            <div className="price">
              <p className="sale-price">${price.sale}</p>
              <p className="old-price">${price.old}</p>
              <p className="discount-tag">{price.discount}% off</p>
            </div>
            <p className="product-code">SKU: {productCode}</p>

            <p className="stock-status">{stockStatus}</p>

            <div className="quantityRecord">
              <div className="round-button">
                <button
                  className="minusButton"
                  onClick={() => setQtyCount((prev) => prev - 1)}
                >
                  <span className="plus-minus-sign">-</span>{" "}
                </button>
                <span className="Quantity">{qtyCount}</span>
                <button
                  className="plusButton"
                  onClick={() => setQtyCount((prev) => prev + 1)}
                >
                  {" "}
                  <span className="plus-minus-sign">+</span>
                </button>
              </div>
            </div>

            <button id="addtocart" style={{ borderRadius: 8 }}>
              Add to Cart
            </button>
          </div>
        </div>
      ) : (
        <div className="product-viewer-flex-column" style={{ padding: 0 }}>
          <div className="product-viewer">
            <div className="image-column">
              {images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Product ${index}`}
                  className={selectedImage === image ? "selected" : ""}
                  onClick={() => setSelectedImage(image)}
                />
              ))}
            </div>
            <div className="product-details">
              <div className="big-image-container">
                <img
                  src={selectedImage}
                  alt="Selected Product"
                  className="big-image"
                  style={{ maxWidth: 500, maxHeight: 500 }}
                />
                <div className="image-navigation">
                  <button onClick={prevImage} className="arrow-button">
                    <FontAwesomeIcon icon={faChevronLeft} color="#24245a" />
                  </button>
                  <button onClick={nextImage} className="arrow-button">
                    <FontAwesomeIcon icon={faChevronRight} color="#24245a" />
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="detailsVI">
            <h2>{name}</h2>
            <div className="ratingsVI">
              {/* Display stars and total reviews */}
              <span className="stars">★★★★★</span>
              <span className="total-reviewsVI">{ratings.reviews} reviews</span>
            </div>
            <div className="price">
              <p className="sale-price">${price.sale}</p>
              <p className="old-price">${price.old}</p>
              <p className="discount-tag">{price.discount}% off</p>
            </div>
            <p className="product-code">SKU: {productCode}</p>

            <p className="stock-status">{stockStatus}</p>

            <div className="quantityRecord">
              <div className="round-button">
                <button
                  className="minusButton"
                  onClick={() => setQtyCount((prev) => prev - 1)}
                >
                  <span className="plus-minus-sign">-</span>{" "}
                </button>
                <span className="Quantity">{qtyCount}</span>
                <button
                  className="plusButton"
                  onClick={() => setQtyCount((prev) => prev + 1)}
                >
                  {" "}
                  <span className="plus-minus-sign">+</span>
                </button>
              </div>
            </div>

            <button id="addtocart" style={{ borderRadius: 8 }}>
              Add to Cart
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ViewItem;
