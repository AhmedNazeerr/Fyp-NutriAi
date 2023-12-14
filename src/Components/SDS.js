import React from "react";
import './SDS.css';
import Navbar from "./Navbar.js";
import img1 from './claybarkit.webp';

import SDSProductCard from './SDSProductCard.js';
import Footer from "./Footer.js";
// import { useState, useEffect } from "react";

const SDS = () => {
 

  // const [isLoading, setIsLoading] = useState(true);
 

  // useEffect(() => {

  //   //MAKE IT ASYNC AND LOAD YOUR DATA HERE//

  //   setTimeout(() => {
  //     setIsLoading(false);
  //   }, 3000);
  // }, []);

  // if (isLoading) {
  //   return (
  //     <div className="loading-container">
  //       <img src={process.env.PUBLIC_URL + '/assets/logo.png'} alt="Logo" className="logo" />
  //       <div className="spinner"></div>
  //     </div>
  //   );
  // }



  const productCards = [
    {
      title: "Product 1",
      option: "Download",
      image: img1,
    },
    {
      title: "Product 2",
      option: "Download",
      image: img1,
    },
    {
      title: "Product 3",
      option: "Download",
      image: img1,
    },
    {
      title: "Product 4",
      option: "Download",
      image: img1,
    },
    {
      title: "Product 5",
      option: "Download",
      image: img1,
    },
    {
      title: "Product 6",
      option: "Download",
      image: img1,
    },
    {
      title: "Product 7",
      option: "Download",
      image: img1,
    },
    {
      title: "Product 8",
      option: "Download",
      image: img1,
    },
    {
      title: "Product 9",
      option: "Download",
      image: img1,
    },
    {
      title: "Product 10",
      option: "Download",
      image: img1,
    },
    {
      title: "Product 11",
      option: "Download",
      image: img1,
    },
    {
      title: "Product 12",
      option: "Download",
      image: img1,
    },
    {
      title: "Product 13",
      option: "Download",
      image: img1,
    },
    {
      title: "Product 14",
      option: "Download",
      image: img1,
    },
    {
      title: "Product 15",
      option: "Download",
      image: img1,
    },
    {
      title: "Product 16",
      option: "Download",
      image: img1,
    },
    {
      title: "Product 17",
      option: "Download",
      image: img1,
    },
    {
      title: "Product 18",
      option: "Download",
      image: img1,
    },
  ];


  return (
    <>
      <Navbar />
      <div className="categorydisplay">
      <h5>Home / SDS (Safety Data Sheets) By Product </h5>
      </div>
      <div className="categoryheading">
        <h1 >
        SDS (Safety Data Sheets) By Product
        </h1>
      </div>

      <div className="category-pagecontainer">
      
      <div className="Barcontainer">
          
            <div className="dflexCC">
             
            {productCards.map((product, index) => (
                <SDSProductCard
                  key={index}
                  discription={product.title} 
                  option={product.option}
                  img={product.image}
                />
              ))}
          
        </div>
      </div>
    </div>
      <Footer />
    </>
  );
};

export default SDS;