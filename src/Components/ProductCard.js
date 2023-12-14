import React, { useState } from 'react';
import './productCard.css';
import { useNavigate } from 'react-router-dom';

const ProductCard = (props) => {
    const navigate = useNavigate();
    const [fadeIn, setFadeIn] = useState(false);

    const handleProductItemClick = (Pname) => {
        console.log(`Clicked on ${Pname}`);
        setFadeIn(true); // Set fade-in to true when clicked
        navigate(`/Products/${Pname}`);
    };

    const ratings = Array(parseInt(props.stars)).fill('★');

    return (
        <div onClick={() => handleProductItemClick(props.discription)} className={`prod-Card ${fadeIn ? "fade-in" : ""}`}
        style={{ animationDelay: `${props.index * 0.3}s` }}>
            <div className='img-container'>
                <div className={`banner ${props.status}`}></div>
                <div className="imgPC">
                    <img className='prodIMG' src={"https://www.nutrifactor.com.pk/cdn/shop/products/Vitamaxwomen30Metallic.png?v=1677239551"} alt='productImage' />
                </div>
            </div>
            <div className="detailsPC">
                <h3 className='disc'>{props.discription}</h3>
                <div className='pricePC'>
                    <span className='afterPC'>${parseInt(props.price)*0.75}</span>
                    <span className='beforePC text-dull'>${props.price}</span>
                </div>
                <div className='rating'>
                    <div className="image-containerPC">
                        {ratings.map((index) => (
                            Array(ratings).fill('★')
                        ))}
                    </div>
                    <span className='text-dull'>{props.NoOfReviews}</span>
                </div>
                <button className="shop-button">Shop</button>
            </div>
        </div>
    );
}

export default ProductCard;
