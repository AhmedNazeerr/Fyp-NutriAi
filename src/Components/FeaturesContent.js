import React from 'react'
import './FeaturesContent.css'
import img from './product-finder.jpg';


function FeaturesContent(props) {
    return (
        <div className='features'>
          <h1>The Best Ceramic Car Wax </h1>
          <p>{props.content}</p>
          <img className= 'image' src={img} alt='' />
        </div>
      );
}

export default FeaturesContent