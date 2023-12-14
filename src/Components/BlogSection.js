import React from 'react';
import './BlogSection.css'; // Make sure to import your CSS file
import {useNavigate} from "react-router-dom";

const blogs = [
  {
    title: 'Revolutionizing Cars: The Benefits of Graphene Coatings for Enhanced Protection and Performance',
    image: './assets/blog1.webp',
  },
  {
    title: 'Ethos Ceramic Shampoo: The Ultimate Solution for Maintaining and Protecting Your Cars Ceramic Coating',
    image: './assets/blog2.webp',
  },
  {
    title: 'Foam Gun Vs. Foam Cannon: Which Is Right For You?',
    image: './assets/blog3.webp',
  },
  {
    title: 'The Benefits of Detailing Your Car Before Shipping It',
    image: './assets/blog4.webp',
  },
];

const BlogSection = () => {
  const navigate = useNavigate();

  const handleBlogClick = () => {
    console.log(`Clicked on Blog`);
    navigate(`/BlogPost`);
  };
  return (
    <div className='main'>
    <div className="blog-heading">
        <h1>BLOG</h1>
      </div>
    <div className="blog-section">
      <div onClick={handleBlogClick} className="main-blog">
        <img src={blogs[0].image} alt={blogs[0].title} className="blog-image" />
        <div className="blog-title">{blogs[0].title}</div>
        <div className="arrow-popup">Click to read</div>
      </div>
      <div className="side-blogs">
        {blogs.slice(1).map((blog, index) => (
          <div onClick={handleBlogClick} key={index} className="side-blog">
            <div className="side-blog-image">
              <img src={blog.image} alt={blog.title} />
              <div className="arrow-popup">Click to read</div>
              <div className="blog-title">{blog.title}</div>
            </div>

          </div>
        ))}
      </div>
    </div>
    </div>
  );
};

export default BlogSection;