import React from "react";
import Slider from "./Slider"; // Import your Slider component
import Shop from "./Shop"; // Import your Shop component
// import ClickablePictures from "./ClickablePictures"; // Import your ClickablePictures component
// import ComparisonSlider from "./ComparisonSlider"; // Import your ComparisonSlider component
// import BlogSection from "./BlogSection"; // Import your BlogSection component
// import ImageReel from "./ImageReel"; // Import your ImageReel component
import Footer from "./Footer"; // Import your Footer component
import "./Home.css";
import 'bootstrap/dist/css/bootstrap.css';
import Navbar from "./Navbar";
import ReviewsHome from "./ReviewsHome";


const Home = () => {
  return (
    <div  className="main">
      <Navbar />
      <Slider />
      <Shop />
      {/* <ClickablePictures /> */}
      {/* <div className="Wrapper" style={{ minHeight: '200px' }}>
        <ComparisonSlider />
      </div> */}
      {/* <BlogSection />
      <div className="instaHeading">@Sparkles.co</div>
      <ImageReel /> */}
      <ReviewsHome/>
      <Footer />
    </div>
  );
};

export default Home;