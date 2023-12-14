import React from 'react';
import './BlogPost.css';
import blogimg from "./Blog.webp"
import Navbar from './Navbar';
import ViewItem from './ViewItem';
import imgP1 from './wax.webp';
import imgP2 from './wax1.webp';
import imgP3 from './wax2.webp';
import imgP4 from './wax3.webp';
import imgP5 from './wax4.webp';
import imgP6 from './wax5.webp';
import imgP7 from './wax6.webp';
import Footer from './Footer';
import {useNavigate} from "react-router-dom";
import contread1 from "./BlogPost1.webp"
import contread2 from "./BlogPost2.webp"


const BlogPost = () => {

    const navigate = useNavigate();

    const handleBlogClick = () => {
      console.log(`Clicked on Blog`);
      navigate(`/BlogPost`);
    };
    const blogs = [
        {
          title: 'Revolutionizing Cars: The Benefits of Graphene Coatings for Enhanced Protection and Performance',
          image: contread1,
        },
        {
          title: 'Ethos Ceramic Shampoo: The Ultimate Solution for Maintaining and Protecting Your Cars Ceramic Coating',
          image: contread2,
        }
      ];
  const headings = [
    "The Evolution of Surface Protection",
    "Making the Choice: Ceramic Refresh or Resist?",
    "In Conclusion",
  ];

  const productData = {
    name: "Product Name",
    images: [
      imgP1,
      imgP2,
      imgP3,
      imgP4,
      imgP5,
      imgP6,
      imgP7
    ],
    ratings: {
      reviews: 50, // Number of reviews
      rating: 5 // Average rating
    },
    price: {
      sale: 79.99,
      old: 99.99,
      discount: 30
    },
    productCode: "ABC123",
    sizes: [
      {
        name: "Size 1 (10 OZ)",
        image: imgP1
      },
      {
        name: "Size 2 (16 OZ)",
        image: imgP6
      },
      {
        name: "Size 3 (32 OZ)",
        image: imgP7
      }
    ],
    stockStatus: "In Stock" // or "Out of Stock"
  };

  return (
    <div>
     <Navbar></Navbar>
     <div className="flex-container">
      <div className="left-content">
        <div className="blog-display">
        <h2>Home / Blog / Resist Vs. Ceramic Refresh: What is the difference? </h2>
        </div>

        <div className='title-content-blog'>
        <h1>Resist Vs. Ceramic Refresh: What is the difference?</h1>
        <p>
          At Ethos, we pride ourselves on delivering high-quality protective solutions that cater to various automotive needs. Among our esteemed line of products, "Ceramic Refresh" and "Resist" stand out as two champions of surface protection. But what makes each unique, and how do you determine which one is right for you? Dive deep with us as we explore the specifics of these two remarkable products.
        </p>
        </div>
      </div>
      <div className="right-content">
        <img src= {blogimg} alt="Blog" />
      </div>
    </div>
   
    <div className="blog-post">
      <div className="date">November 5, 2023</div>
      <div className="content">
        {headings.map((heading, index) => (
          <div style= {{marginBottom: "5%"}} key={index}>
            {index === 0 && (
              <div className='content-one'> 
              <h2>{heading}</h2>
              <p>
                With the evolving nature of car care technology, understanding the nuances between different protection products is crucial. Gone are the days when wax was the only protection option. Today, we have a myriad of advanced products that cater to every aspect of car protection. Among these, ceramic and graphene coatings represent the pinnacle of surface protection technology.
              </p>
              </div>
            )}
            {index === 1 && (
              <div className='content-two'>
                <h2>{heading}</h2>
                <p>
                  Your choice ultimately hinges on your protective base:
                </p>
                <ul>
                  <li>
                    For Ceramic Coatings: If you've invested in a ceramic coating and seek regular maintenance while occasionally bolstering its protective attributes, "Ceramic Refresh" is your go-to.
                  </li>
                  <li>
                    For Graphene Coatings: If graphene is your protection of choice and you desire an enhancement in its protective qualities, shine, and longevity, "Resist" is tailored for you.
                  </li>
                </ul>
              </div>
            )}
            {index === 2 && (
              <div className='content-three'>
                <h2>{heading}</h2>
                <p>
                  Every car enthusiast, detailer, or owner seeks the best for their vehicle. Whether it's the rejuvenating prowess of Ceramic Refresh or the graphene-optimized strength of Resist, Ethos ensures your vehicle gets the care and protection it deserves.
                </p>
                <p>
                  At Ethos, we are more than just products; we are a commitment to excellence, ensuring every drive is as pristine as the first.
                </p>
                <p>
                  For further queries or to explore our entire product range, don't hesitate to reach out to our dedicated Ethos Customer Support Team.
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>

    <div className='PC-BLOG'>
    <ViewItem productData={productData} />
    </div>

    <div className='Continue-Reading'>
        <div>
        <h1>Continue Reading</h1>
        </div>

        <div className='continue-blogs'>
    {blogs.map((blog, index) => (
        <div onClick={handleBlogClick} key={index} className="BP-CR">
            <div className="BP-image">
                <img src={blog.image} alt={blog.title} />
                <div className="BP-title">{blog.title}</div>
            </div>
        </div>
    ))}
</div>

    </div>
                
    <Footer></Footer>
    </div>
  );
}

export default BlogPost;
