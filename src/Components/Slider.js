import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import 'bootstrap/dist/js/bootstrap.bundle.min'; 
import './Slider.css'; // You can style the carousel in this CSS file
export default function Slider() {
  
  return(
    <div id="carouselExampleCaptions" class="carousel slide">
    <div class="carousel-indicators">
      <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
      <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
      <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
    </div>
    <div class="carousel-inner">
      <div class="carousel-item active">
      <div class="carousel-caption d-none d-md-block">
          <h5>First slide label</h5>
          <p>Some representative placeholder content for the first slide.</p>
        </div>
        <img src="https://www.nutrifactor.com.pk/cdn/shop/files/Diabetes_Banner_3d_2_Mobile_version_7dd29219-e8b4-4e2b-9e99-492d78f6aac1.webp?v=1693986642" class="d-block w-100 h-50" alt=""/>
       
      </div>
      <div class="carousel-item">
      <img src="https://www.nutrifactor.com.pk/cdn/shop/files/Multi-models-banner-Web-1a-Mobile-Bannera_350ac18d-ea30-406c-a541-595efe3b56c7.webp?v=1693986640" class="d-block w-100 h-50" alt=""/>
        <div class="carousel-caption d-none d-md-block">
          <h5>Second slide label</h5>
          <p>Some representative placeholder content for the second slide.</p>
        </div>
      </div>
      <div class="carousel-item">
      <img src="https://www.nutrifactor.com.pk/cdn/shop/files/kids_banner_3d_1_Mobile_Size_updated_18-08-23_2d1ecabd-8ba4-4db2-91c7-6446d0cf7a33.webp?v=1693986643" class="d-block w-100 h-50" alt=""/>
        <div class="carousel-caption d-none d-md-block">
          <h5>Third slide label</h5>
          <p>Some representative placeholder content for the third slide.</p>
        </div>
      </div>
    </div>
    <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Previous</span>
    </button>
    <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
      <span class="carousel-control-next-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Next</span>
    </button>
  </div>
)
}
