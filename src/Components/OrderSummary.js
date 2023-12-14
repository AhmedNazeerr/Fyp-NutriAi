import React, { useState } from "react";
import "./OrderSummary.css"; // Create this CSS file for styling
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock, faShoppingCart } from "@fortawesome/free-solid-svg-icons";

const OrderSummary = ({ shipping = 0, tax = 0, products = [] }) => {
  const [isCouponOpen, setIsCouponOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const toggleCoupon = () => {
    setIsCouponOpen(!isCouponOpen);
  };

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  const totalItemsCost = products.reduce(
    (total, product) => total + product.price * product.quantity,
    0
  );

  const totalCost = totalItemsCost + shipping + tax;

  return (
    <div className="order-summary-bar">
      {/* Section 1: Order Summary */}
      <div className="section order-summary">
        <div className="order-summary-title">
          <h2 style={{ marginBottom: "2%" }}>Order Summary</h2>
          <span className="lock-symbol">
            <FontAwesomeIcon icon={faLock} />{" "}
            {/* Replace with Font Awesome lock icon */}
          </span>
        </div>
      </div>

      {/* Section 2: Items, Shipping, and Tax */}
      <div className="section IST">
        <div className="rowIST">
          <div className="label">Items</div>
          <div className="value">${totalItemsCost}</div>{" "}
          {/* Display items as currency */}
        </div>
        <div className="rowIST">
          <div className="label">Shipping</div>
          <div className="value">${shipping}</div>{" "}
          {/* Display shipping as currency */}
        </div>
        <div className="rowIST">
          <div className="label">Tax</div>
          <div className="value">${tax}</div> {/* Display tax as currency */}
        </div>
      </div>

      {/* Section 3: Have a Coupon? */}
      <div className="section coupon">
        <div className="cart-label">
          {" "}
          <strong>Have a Coupon?</strong>
          <button
            className={`cart-toggle ${isCouponOpen ? "open" : ""}`}
            onClick={toggleCoupon}
          >
            {isCouponOpen ? "-" : "+"}
          </button>
        </div>
        {isCouponOpen && (
          <div className={`coupon-input ${isCouponOpen ? "slide-down" : ""}`}>
            <input type="text" placeholder="Enter coupon code" />
            <button className="apply-button">Apply</button>
          </div>
        )}
      </div>

      {/* Section 4: Your Cart */}
      <div className="section cart">
        <div
          className="cart-label"
          onClick={toggleCart}
          style={{ marginTop: "3%" }}
        >
          <div>
            <span className="cart-icon">
              <FontAwesomeIcon icon={faShoppingCart} />{" "}
              {/* Replace with Font Awesome cart icon */}
            </span>
            <strong>Your Cart</strong>
          </div>
          <button className={`cart-toggle ${isCartOpen ? "open" : ""}`}>
            {isCartOpen ? "-" : "+"}
          </button>
        </div>
        {isCartOpen && (
          <div className={`cart-content ${isCartOpen ? "open" : ""}`}>
            {products.map((product, index) => (
              <div key={index} className="cart-item">
                <img
                  src={product.image}
                  alt={product.name}
                  className="product-image"
                />
                <div className="product-details">
                  <div className="product-name">{product.name}</div>
                  <div className="product-quantity">
                    Qty: {product.quantity}
                  </div>
                  <div className="product-price">${product.price}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Section 5: Total */}
      <div className="section total">
        <div className="row">
          <div className="label">Total</div>
          <div className="value">${totalCost}</div>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
