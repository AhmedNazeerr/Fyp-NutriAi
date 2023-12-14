import React, { useState } from 'react';
import './ReviewsPP.css'

const reviewsData = [
    {
      id: 1,
      customerName: 'John Doe',
      rating: 4,
      keyword: 'Great Service',
      description: 'I had a wonderful experience with the staff at this restaurant. The service was exceptional, and the food was delicious. The atmosphere was cozy and welcoming. I will definitely be coming back for more.',
      date: '2023-09-05'
    },
    {
      id: 2,
      customerName: 'Jane Smith',
      rating: 5,
      keyword: 'Excellent Experience',
      description: 'I can\'t say enough good things about my visit to this place. From the moment I walked in, I was impressed. The service was impeccable, and the food was outstanding. The ambiance was perfect for a special evening. I highly recommend it to anyone looking for a memorable dining experience.',
      date: '2023-09-05'
    },
    {
      id: 3,
      customerName: 'Alice Johnson',
      rating: 3,
      keyword: 'Average Visit',
      description: 'My recent visit to this restaurant was decent. The service was okay, and the food was average. Nothing particularly stood out, but it wasn\'t a terrible experience either. It might be worth trying if you\'re in the area.',
      date: '2023-09-05'
    },
    {
      id: 4,
      customerName: 'Bob Williams',
      rating: 4,
      keyword: 'Good Food',
      description: 'I enjoyed a tasty meal at this restaurant. The food quality was good, and the flavors were well-balanced. The service was prompt, and the staff was friendly. I would definitely consider returning for another meal.',
      date: '2023-09-05'
    },
    {
      id: 5,
      customerName: 'Eva Brown',
      rating: 5,
      keyword: 'Outstanding Service',
      description: 'The service at this restaurant was outstanding. The staff went above and beyond to make our dining experience exceptional. The food was not only delicious but also beautifully presented. It was a truly memorable evening.',
      date: '2023-09-05'
    },
    {
      id: 6,
      customerName: 'Michael Davis',
      rating: 4,
      keyword: 'Delicious Meals',
      description: 'I had a delightful dinner here. The meals were delicious, and the portion sizes were just right. The atmosphere was cozy and relaxing. The only reason I didn\'t give it a 5-star rating is because the wait time for our food was a bit longer than expected.',
      date: '2023-09-05'
    },
    {
      id: 7,
      customerName: 'Sophia Wilson',
      rating: 2,
      keyword: 'Disappointing Experience',
      description: 'Unfortunately, my experience at this restaurant was disappointing. The service was slow, and the food quality did not meet my expectations. I had high hopes, but it fell short. I hope they can improve in the future.',
      date: '2023-09-05'
    },
    {
      id: 8,
      customerName: 'Olivia Lee',
      rating: 5,
      keyword: 'Highly Recommend',
      description: 'I had an amazing time at this restaurant. Everything was top-notch, from the service to the food. I can\'t recommend it enough. If you want a fantastic dining experience, this is the place to go.',
      date: '2023-09-05'
    },
    {
      id: 9,
      customerName: 'Liam Moore',
      rating: 3,
      keyword: 'Okay Service',
      description: 'My experience here was just okay. The service was decent, and the food was alright. It didn\'t exceed my expectations, but it also didn\'t disappoint. It\'s a decent option for a casual meal.',
      date: '2023-09-05'
    },
    {
      id: 10,
      customerName: 'Ava Garcia',
      rating: 4,
      keyword: 'Friendly Staff',
      description: 'The staff at this restaurant were incredibly friendly and accommodating. They made us feel welcome, and the service was attentive. The food was good, and the overall experience was enjoyable. I would come back for the friendly atmosphere.',
      date: '2023-09-05'
    },
  ];

const ReviewsPP = (props) => {
  const { count } = props;
  const [currentPage, setCurrentPage] = useState(1);
  const reviewsPerPage = 5;
  const totalPages = Math.ceil(reviewsData.length / reviewsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const startIndex = (currentPage - 1) * reviewsPerPage;
  const endIndex = startIndex + reviewsPerPage;
  const currentReviews = reviewsData.slice(startIndex, endIndex);

  return (
    <div className='ReviewsPP'>
        <div className='ReviewsBar'>
            <div className='headingRB'>
                <h2>Reviews</h2>
            </div>
            <div className='CountRB'>
                <h6>{count} Reviews</h6>
            </div>
        </div>
      <ul>
        {currentReviews.map((review) => (
          <div key={review.id} className="review-itemPP">
            <div className="avatarPP">
              {getInitials(review.customerName)}
            </div>
            <div className="review-contentPP">

            <div className='parentCN-date'>
            <div className='CustomerNameRB'>
                <h6>{review.customerName}</h6>
            </div>
            <div className='DateRB'>
                <p className='datePP'>{formatDate(review.date)}</p> {/* Display the date here */}
            </div>
            </div>
              <p id='ratingPP'>{Array(review.rating).fill('★')}</p>

              <div className='ReviewsDescription-PP'>
              <strong>{review.keyword} </strong>
              <p>{review.description}</p>
              </div>
            </div>
          </div>
        ))}
      </ul>
      <div className="paginationReviewsPP">
        <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
          &lt;
        </button>
        {Array.from({ length: totalPages }).map((_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            className={currentPage === index + 1 ? 'active' : ''}
          >
            {index + 1}
          </button>
        ))}
        <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
         &gt;
        </button>
      </div>
    </div>
  );
};

function getInitials(name) {
    const nameParts = name.split(' ');
    return nameParts.map((part) => part.charAt(0).toUpperCase()).join('');
  }

function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  }
export default ReviewsPP;
