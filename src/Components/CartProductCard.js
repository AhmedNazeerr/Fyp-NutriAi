import React from 'react'
import './cartproductcard.css'

const CartProductCard = ({ product }) => {
    return (
        <div className='mainDiv'>
            <div className="imgDiv">
                <img src={product.image} alt={product.name} className="product-image" />
            </div>
            <button className="addbutton">ADD</button>
            <div className="nameDiv">
                <span>{product.name}</span>
            </div>
            <div className="pprice">
                <div className="pprice1">${product.priceAfter}</div>
                <div className="pprice2">${product.priceBefore}</div>
            </div>
        </div>
    )
}

export default CartProductCard