import React, { useState ,useEffect} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import './Reviews.css'; // Import your CSS file for styling

const reviewsData = [
  {
    id: 1,
    rating: 5,
    date: '26/08/2023',
    title: 'Works Great',
    product: 'Product A - ',
    review: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    description: 'This is the description',
    image: "https://www.nutrifactor.com.pk/cdn/shop/products/Vitamaxwomen30Metallic.png?v=1677239551",
    author: 'P. Name',
  },
  {
    id: 2,
    rating: 3,
    date: '26/08/2023',
    title: 'Decent',
    product: 'Product B - ',
    review: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    description: 'This is the description',
    image: "https://www.nutrifactor.com.pk/cdn/shop/products/Vitamaxwomen30Metallic.png?v=1677239551",
    author: 'P. Name',
  },
  {
    id: 3,
    rating: 2,
    date: '26/08/2023',
    title: 'Bad',
    product: 'Product C - ',
    review: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    description: 'This is the description',
    image: "https://www.nutrifactor.com.pk/cdn/shop/products/Vitamaxwomen30Metallic.png?v=1677239551",
    author: 'P. Name',
  },
  {
    id: 4,
    rating: 4,
    date: '26/08/2023',
    title: 'Good',
    product: 'Product D - ',
    review: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    description: 'This is the description',
    image: "https://www.nutrifactor.com.pk/cdn/shop/products/Vitamaxwomen30Metallic.png?v=1677239551",
    author: 'P. Name',
  },
];

const ReviewsHome = () => {
  const [currentReviewIndex, setCurrentReviewIndex] = useState(0);
  const [fadeAnimation, setFadeAnimation] = useState(false);
  const [isMobileView, setIsMobileView] = useState(window.innerWidth <= 768);

  const nextReview = () => {
    setFadeAnimation(true);
    setTimeout(() => {
      setCurrentReviewIndex((prevIndex) => (prevIndex + 1) % reviewsData.length);
      setFadeAnimation(false);
    }, 300); // 300ms is the duration of your fade-out animation
  };
  
  const prevReview = () => {
    setFadeAnimation(true);
    setTimeout(() => {
      setCurrentReviewIndex((prevIndex) =>
        prevIndex === 0 ? reviewsData.length - 1 : prevIndex - 1
      );
      setFadeAnimation(false);
    }, 300); // 300ms is the duration of your fade-out animation


  };
   useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth <= 768);

    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [isMobileView]);
    return (
      <>
      {isMobileView ? (
        <div className="review-slider">
        <div className="slider-controls">
          <div className="slider-heading">Real Customer Reviews</div>
          <div className="total-reviews">{`${reviewsData.length} Reviews`}</div>
          <div className="navigation">
            <div><FontAwesomeIcon icon={faChevronLeft} onClick={prevReview} /></div>
            <div><FontAwesomeIcon icon={faChevronRight} onClick={nextReview} /></div>
          </div>
        </div>
        <div
          className="slider-content"
          style={{ "--current-index": currentReviewIndex}}
        >
          {reviewsData.slice(currentReviewIndex, currentReviewIndex + 1).map((review, index) => (
            <div
            key={review.id}
            className={`review-card ${fadeAnimation ? "fadeout" : "fadein"}`}
            >
              <div className="review-header">
              <div className="rating">{Array(review.rating).fill('★')}</div>
              {/* <div className="date">{review.date}</div> */}
            </div>
            <div className="product-info">
              <img src={review.image} className="product-image" alt={review.product} />
              <div className="product-details">
              <p className="review-text">{review.review}</p>
            <p className="reviewer-name">{review.author}</p>
              </div>
            </div>
            <h3 className="product-title">{review.product}</h3>
           <p className="product-description">{review.description}</p>
          </div>
          
          ))}
        </div>
      </div>
      ) : (
      <div className="review-slider">
        <div className="slider-controls">
          <div className="slider-heading">Real Customer Reviews</div>
          <div className="total-reviews">{`${reviewsData.length} Reviews`}</div>
          <div className="navigation">
            <FontAwesomeIcon icon={faChevronLeft} onClick={prevReview} />
            <FontAwesomeIcon icon={faChevronRight} onClick={nextReview} />
          </div>
        </div>
        <div
          className="slider-content"
          style={{ "--current-index": currentReviewIndex }}
        >
          {reviewsData.slice(currentReviewIndex, currentReviewIndex + 3).map((review, index) => (
            <div
            key={review.id}
            className={`review-card ${fadeAnimation ? "fadeout" : "fadein"}`}
            >
              <div className="review-header">
              <div className="rating">{Array(review.rating).fill('★')}</div>
              {/* <div className="date">{review.date}</div> */}
            </div>
            <div className="product-info">
              <img src={review.image} className="product-image" alt={review.product} />
              <div className="product-details">
              <p className="review-text">{review.review}</p>
            <p className="reviewer-name">{review.author}</p>
              </div>
            </div>
            <h3 className="product-title">{review.product}</h3>
           <p className="product-description">{review.description}</p>
          </div>
          
          ))}
        </div>
      </div>
      )}
      </>
    );
  };

export default ReviewsHome;
