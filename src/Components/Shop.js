import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "./Shop.css";
import { useNavigate } from "react-router-dom";
import Skeleton from "react-loading-skeleton";

export default function Shop() {
  const navigate = useNavigate();
  const categories = [
    {
      name: "BEST SELLERS",
      products: [
        {
          title: "Product 1",
          description: "This is the description of the product",
          image: "https://www.nutrifactor.com.pk/cdn/shop/products/Vitamaxwomen30Metallic.png?v=1677239551",
          oldprice: "$20.00",
          newprice: "From $0.00",
        },
        {
          title: "Product 2",
          description: "This is the description of the product",
          image: "https://www.nutrifactor.com.pk/cdn/shop/products/Vitamaxwomen30Metallic.png?v=1677239551",
          oldprice: "$10.00",
          newprice: "From $0.00",
        },
        {
          title: "Product 3",
          description: "This is the description of the product",
          image: "https://www.nutrifactor.com.pk/cdn/shop/products/Vitamaxwomen30Metallic.png?v=1677239551",
          oldprice: "$19.00",
          newprice: "From $0.00",
        },
        {
          title: "Product 4",
          description: "This is the description of the product",
          image: "https://www.nutrifactor.com.pk/cdn/shop/products/Vitamaxwomen30Metallic.png?v=1677239551",
          oldprice: "$17.00",
          newprice: "From $0.00",
        },
      ],
    },
    {
      name: "NEW RELEASES",
      products: [
        {
          title: "Product 1",
          description: "This is the description of the product",
          image: "https://www.nutrifactor.com.pk/cdn/shop/products/Vitamaxwomen30Metallic.png?v=1677239551",
          oldprice: "$20.00",
          newprice: "From $0.00",
        },
        {
          title: "Product 2",
          description: "This is the description of the product",
          image: "https://www.nutrifactor.com.pk/cdn/shop/products/Vitamaxwomen30Metallic.png?v=1677239551",
          oldprice: "$10.00",
          newprice: "From $0.00",
        },
        {
          title: "Product 3",
          description: "This is the description of the product",
          image: "https://www.nutrifactor.com.pk/cdn/shop/products/Vitamaxwomen30Metallic.png?v=1677239551",
          oldprice: "$19.00",
          newprice: "From $0.00",
        },
        {
          title: "Product 4",
          description: "This is the description of the product",
          image: "https://www.nutrifactor.com.pk/cdn/shop/products/Vitamaxwomen30Metallic.png?v=1677239551",
          oldprice: "$17.00",
          newprice: "From $0.00",
        },
      ],
    },
    {
      name: "ACCESSORIES",
      products: [
        {
          title: "Product 1",
          description: "This is the description of the product",
          image: "https://www.nutrifactor.com.pk/cdn/shop/products/Vitamaxwomen30Metallic.png?v=1677239551",
          oldprice: "$20.00",
          newprice: "From $0.00",
        },
        {
          title: "Product 2",
          description: "This is the description of the product",
          image: "https://www.nutrifactor.com.pk/cdn/shop/products/Vitamaxwomen30Metallic.png?v=1677239551",
          oldprice: "$10.00",
          newprice: "From $0.00",
        },
        {
          title: "Product 3",
          description: "This is the description of the product",
          image: "https://www.nutrifactor.com.pk/cdn/shop/products/Vitamaxwomen30Metallic.png?v=1677239551",
          oldprice: "$19.00",
          newprice: "From $0.00",
        },
        {
          title: "Product 4",
          description: "This is the description of the product",
          image: "https://www.nutrifactor.com.pk/cdn/shop/products/Vitamaxwomen30Metallic.png?v=1677239551",
          oldprice: "$17.00",
          newprice: "From $0.00",
        },
      ],
    },
  ];

  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const [activeButtonIndex, setActiveButtonIndex] = useState(0);
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    setFadeIn(true);
  }, [selectedCategory]);

  const handleClick = (category, index) => {
    setSelectedCategory(category);
    setActiveButtonIndex(index);
    setFadeIn(false);
    setTimeout(() => {
      setFadeIn(true);
    }, 100);
    console.log("yo!");
  };

  const handleProductItemClick = (Pname) => {
    console.log(`Clicked on ${Pname}`);
    navigate(`/Products/${Pname}`);
  };

  return (

    <div className="main-div">
    <div className="shop-container">
      <div className="shop-heading">
        <h1>SHOP</h1>
      </div>

      <div className="categories">
        {categories.map((category, index) => {
          const buttonClass = `category-button ${
            index === activeButtonIndex ? "active" : ""
          }`;
          return (
            <button
              key={index}
              className={buttonClass}
              onClick={() => handleClick(category, index)}
            >
              {category.name}
              <div className="category-line"></div>
            </button>
          );
        })}
      </div>

      <div className="d-flex">
        {selectedCategory.products.map((product, index) => (
          <div
            key={index}
            className={`product-card ${fadeIn ? "fade-in" : ""}`}
            style={{ animationDelay: `${index * 0.05}s` }}
            onClick={() => handleProductItemClick(product.title)}
          >
            <div className="card-body">
              {(
                <img
                  src={product.image}
                  className="card-img-top"
                  alt={product.title}
                />
              ) || <Skeleton count={10} />}
              <h4 className="card-title">{product.title || <Skeleton />}</h4>
              <p className="card-description">
                {product.description || <Skeleton count={2} />}
              </p>
              <div className="price">
                <p className="newprice">{product.newprice || <Skeleton />}</p>
                <p className="oldprice">{product.oldprice || <Skeleton />}</p>
              </div>
              <button className="shop-button">Shop</button>
            </div>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
}
