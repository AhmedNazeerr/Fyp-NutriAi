import React, { useState, useEffect } from "react";
import "./CartOrderSummary.css"; // Create this CSS file for styling
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock } from "@fortawesome/free-solid-svg-icons";

const CartOrderSummary = ({
  shipping = 0,
  tax = 0,
  total = 0,
  toggleCheckoutBtn,
}) => {
  const [isCouponOpen, setIsCouponOpen] = useState(false);

  const toggleCoupon = () => {
    setIsCouponOpen(!isCouponOpen);
  };

  const totalItemsCost = total;

  const calculatedTotalItemsCost = (totalItemsCost + shipping + tax).toFixed(
    Math.max(
      totalItemsCost.toString().split(".")[1]?.length || 0,
      shipping.toString().split(".")[1]?.length || 0,
      tax.toString().split(".")[1]?.length || 0
    )
  );

  const totalCost = parseFloat(calculatedTotalItemsCost);

  // for checkout btn for smaller screens

  const isSmallScreen = () => window.innerWidth < 950;
  const [smallScreen, setSmallScreen] = useState(isSmallScreen());

  useEffect(() => {
    const handleResize = () => {
      setSmallScreen(isSmallScreen());
    };

    window.addEventListener("resize", handleResize);
    handleResize();
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="order-summary-bar">
      {/* Section 1: Order Summary */}
      <div className="section-order-summary">
        <div className="order-summary-title">
          <h4>Order Summary</h4>
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
        <div className="coupon-label">
          {" "}
          <strong>Have a Coupon?</strong>
        </div>
        <button
          className={`coupon-toggle ${isCouponOpen ? "open" : ""}`}
          onClick={toggleCoupon}
        >
          {isCouponOpen ? "-" : "+"}
        </button>
        {isCouponOpen && (
          <div className={`coupon-input ${isCouponOpen ? "slide-down" : ""}`}>
            <input type="text" placeholder="Enter coupon code" />
            <button className="apply-button">Apply</button>
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
      {/* checkout btn  */}
      {!smallScreen ? (
        <div className="StickyCheckoutBtnLarge">
          <button
            onClick={toggleCheckoutBtn}
            className="StickyRoundButtonLarge"
          >
            <span className="locksymbol">
              <FontAwesomeIcon icon={faLock} />
            </span>
            Checkout
          </button>
          <p style={{ marginTop: "2%", fontSize: "12px" }}>
            By placing your order, you agree to our <u>Terms & Conditions</u>.
          </p>
        </div>
      ) : null}

      {/* Final note section */}
      <div className="section-note">
        <p>PLEASE MAKE SURE YOUR ORDER IS CORRECT BEFORE PLACING IT.</p>
        <span>
          No changes can be made to your order after it is placed, including
          cancellations. Free Shipping and $4.99 flat rate shipping apply only
          to orders in the contiguous 48 United States.
        </span>
      </div>
    </div>
  );
};

export default CartOrderSummary;
