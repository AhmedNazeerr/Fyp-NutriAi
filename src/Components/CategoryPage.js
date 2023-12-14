import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import Filter from "./Filter.js";
import './CategoryPage.css';
import Navbar from "./Navbar.js";
import img1 from './claybarkit.webp';
import img2 from './claybarkit.webp';
import img3 from './claybarkit.webp';
import Bar from './Bar.js';
import ProductCard from './ProductCard.js';
import Reviews from './Reviews.js'
import Footer from "./Footer.js";
import { useState} from "react";

const CategoryPage = ({ categoryData, subcategoryContent }) => {
 
  const navigate = useNavigate();
  const handleProductItemClick = (Pname) => {
    console.log(`Clicked on ${Pname}`);
    navigate(`/Products/${Pname}`);
  };
  const { categoryName } = useParams();
  const subheadings = categoryData[categoryName] || [];
  const [currentPage, setCurrentPage] = useState(1);
  const productCards = [
    {
      title: "Product 1",
      newprice: 19.99,
      stars: 4.5,
      NoOfReviews: 100,
      image: img1,
      status: "none",
    },
    {
      title: "Product 2",
      newprice: 29.99,
      stars: 4.2,
      NoOfReviews: 75,
      image: img1,
      status: "bestselling",
    },
    {
      title: "Product 3",
      newprice: 14.99,
      stars: 4.8,
      NoOfReviews: 150,
      image: img1,
      status: "soldout",
    },
    {
      title: "Product 4",
      newprice: 39.99,
      stars: 4.0,
      NoOfReviews: 50,
      image: img1,
      status: "none",
    },
    {
      title: "Product 5",
      newprice: 19.99,
      stars: 4.5,
      NoOfReviews: 100,
      image: img1,
      status: "none",
    },
    {
      title: "Product 6",
      newprice: 29.99,
      stars: 4.2,
      NoOfReviews: 75,
      image: img1,
      status: "bestselling",
    },
    {
      title: "Product 7",
      newprice: 14.99,
      stars: 4.8,
      NoOfReviews: 150,
      image: img1,
      status: "soldout",
    },
    {
      title: "Product 8",
      newprice: 39.99,
      stars: 4.0,
      NoOfReviews: 50,
      image: img1,
      status: "none",
    },
    {
      title: "Product 9",
      newprice: 19.99,
      stars: 4.5,
      NoOfReviews: 100,
      image: img1,
      status: "none",
    },
    {
      title: "Product 10",
      newprice: 29.99,
      stars: 4.2,
      NoOfReviews: 75,
      image: img1,
      status: "bestselling",
    },
    {
      title: "Product 11",
      newprice: 14.99,
      stars: 4.8,
      NoOfReviews: 150,
      image: img1,
      status: "soldout",
    },
    {
      title: "Product 12",
      newprice: 39.99,
      stars: 4.0,
      NoOfReviews: 50,
      image: img1,
      status: "none",
    },
    {
      title: "Product 13",
      newprice: 19.99,
      stars: 4.5,
      NoOfReviews: 100,
      image: img1,
      status: "none",
    },
    {
      title: "Product 14",
      newprice: 29.99,
      stars: 4.2,
      NoOfReviews: 75,
      image: img1,
      status: "bestselling",
    },
    {
      title: "Product 15",
      newprice: 14.99,
      stars: 4.8,
      NoOfReviews: 150,
      image: img1,
      status: "soldout",
    },
    {
      title: "Product 16",
      newprice: 39.99,
      stars: 4.0,
      NoOfReviews: 50,
      image: img1,
      status: "none",
    },
    {
      title: "Product 17",
      newprice: 19.99,
      stars: 4.5,
      NoOfReviews: 100,
      image: img1,
      status: "none",
    },
    {
      title: "Product 18",
      newprice: 29.99,
      stars: 4.2,
      NoOfReviews: 75,
      image: img1,
      status: "bestselling",
    },
  ];

  const products = [
    {
      title: 'Product 1',
      description: 'This is the description of the product',
      image: img1,
      oldprice: '$20.00',
      newprice: 'From $0.00',
    },
    {
      title: 'Product 2',
      description: 'This is the description of the product',
      image: img2,
      oldprice: '$10.00',
      newprice: 'From $0.00',
    },
    {
      title: 'Product 3',
      description: 'This is the description of the product',
      image: img3,
      oldprice: '$19.00',
      newprice: 'From $0.00',
    }
  ]
  const productsPerPage = 9; // Number of products to display per page
  const totalProducts = productCards.length; // Replace this with your actual product data
  const totalPages = Math.ceil(totalProducts / productsPerPage);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;

  return (
    <>
      <Navbar />
      <div className="category-display">
      <h5>Home /  {categoryName} </h5>
      </div>
      <div className="category-heading">
        <h1 className={`main-category ${categoryName !== null ? 'active' : ''}`}>
          {categoryName}
        </h1>
      </div>

      <div className="category-page-container">
      <div className="filter-container">
        <Filter subcategoryContent={categoryName} subheadingContent={subheadings} />
      </div>

      <div className="Bar-container">
          <Bar count="9" />
          <div className="additional-content">
            <div className="d-flexCC">
              {productCards.slice(startIndex, endIndex).map((product, index) => (
                <ProductCard
                  key={index}
                  discription={product.title} 
                  price={product.newprice}
                  stars={product.stars}
                  NoOfReviews={product.NoOfReviews}
                  img={product.image}
                  status={product.status}
                />
              ))}
            </div>
        
        <div className="paginationCP">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
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
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          &gt;
        </button>
      </div>
        </div>
      </div>
    </div>
      

      <div className="descriptionCP-wrapper">
      <div className="descriptionCP">
        <p>
        Ethos Car Care supplies premium Car Cleaning Products that provide the best cleaning experience available. We manufacture innovative cleaners that quickly and safely deep clean your wheels, tires, trim, engine bay and exterior surfaces. Our Super APC and Interior Detailer go to work to clean and protect all interior surfaces such as leather, plastics, vinyl and fabric. Ethos is your one stop shop for all of your car Cleaning Supply needs.
        </p>
      </div>
      </div>

      <div className="RecentlyViewed">
        <div className="RV-headingWrapper">
            <h1 className="RV-heading">
            Recently Viewed
            </h1>
            <div className="d-flexRW">
            {products.map((product, index) => (
            <div key={index} onClick={() => handleProductItemClick(product.title)} className="product-cardRW">
            <div className="card-body">
              <img src={product.image} className="card-img-top" alt={product.title} />
              <h4 className="card-title">{product.title}</h4>
              <p className="card-description">{product.description}</p>
              <div className="price">
                <p className="newprice">{product.newprice}</p>
                <p className="oldprice">{product.oldprice}</p>
              </div>
              {/* <button className="shop-button">Shop</button> */}
            </div>
          </div>
          
        ))}
      </div>
        </div>
      </div>
     <div>
        <Reviews />
      </div> 
      <Footer />
    </>
  );
};

export default CategoryPage;