import React from "react";
import "./CheckoutPage.css";
import Navbar from "./Navbar";
import Footer from "./Footer";
import CustomInput from "./CustomInput";
import OrderSummary from "./OrderSummary";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
// import { faLock } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";

const dummyProduct = {
  name: "Dummy Product",
  quantity: 3,
  price: 19.99,
  image: "https://via.placeholder.com/40x40", // Dummy image URL
};

// const shippingMethods = [
//   {
//     id: "standard",
//     label: "Standard Flat Rate (est. 2-3 days)",
//     cost: "$4.99",
//   },
//   // Add more shipping methods to this array if needed
// ];

const CheckoutPage = () => {
  const isSmallScreen = () => window.innerWidth < 950;
  const [smallScreen, setSmallScreen] = useState(isSmallScreen());
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    setMenuOpen(!menuOpen);
    setExpanded(!expanded);
  };

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

  const handleBackToCartClick = () => {
    console.log("Back To Card Clicked");
    navigate("/CartPage");
  };

  const handleCheckoutClick = () => {
    Swal.fire({
      title: "Success!",
      text: `Congratulations! Your order has been placed successfully.        Total Price: $68.46`,
      icon: "success",
      confirmButtonText: "OK",
    });

    console.log(`Clicked on Checkout yo yo`);
    // navigate(`/CheckoutPage`);
  };

  return (
    <div>
      <Navbar shouldExecute={false} />
      {smallScreen ? (
        <div className="Parent">
          <div className={`collapsible ${isMenuOpen ? "open" : ""}`}>
            <div className="collapsible-header">
              <div className="cart-icon">
                <FontAwesomeIcon icon={faShoppingCart} />
              </div>
              <span className="showOS">Show Order Summary</span>
              <div className="plus-sign" onClick={toggleMenu}>
                {isMenuOpen ? "-" : "+"}
              </div>
            </div>
            <ul className={`collapsibleOS ${menuOpen ? "expanded" : ""}`}>
              <div className="OrderSummary">
                <OrderSummary
                  shipping={5.99}
                  tax={2.5}
                  products={[dummyProduct]}
                />
              </div>
            </ul>
          </div>

          <div className="SecureCheckout" id="SC_mob">
            <div className="address-display">
              <h6>
                <strong>Shipping</strong> / Payment / Confirm Order
              </h6>
            </div>
            <div className="checkout-heading">
              <h2>Secure Checkout</h2>
              <hr />
            </div>
            <div className="contact-info">
              <h3>Contact Information</h3>
              <CustomInput label="Email*" inputType="email" />
              <CustomInput label="Email Confirmation*" inputType="email" />
              <div className="checkbox">
                <input type="checkbox" id="newsletter" />
                <label htmlFor="newsletter">
                  Sign up to get the latest news, deals, and product releases
                  sent to your inbox! We will not share your personal
                  information. Please review our Privacy Policy.
                </label>
              </div>

              <CustomInput label="Phone Number*" inputType={"number"} />

              <div className="checkbox">
                <input type="checkbox" id="marketingTexts" />
                <label htmlFor="marketingTexts">
                  Please sign me up to receive marketing text messages.
                </label>
              </div>
            </div>

            {/* Shipping Information Section */}
            <div className="shipping-info">
              <h3>Shipping Address</h3>
              <div className="FL-container">
                <CustomInput label="First Name*" inputType={"text"} />
                <CustomInput label="Last Name*" inputType={"text"} />
              </div>
              <CustomInput label="Address 1*" inputType={"text"} />
              <CustomInput label="Address 2" inputType={"text"} />
              <div className="CPZ-container">
                <div className="CITY-INPUT">
                  <CustomInput label="City*" inputType={"text"} />
                </div>

                <div>
                  <select className="province-dropdown">
                  <option>Punjab</option>
                    <option value="Sindh">Sindh</option>
                    <option value="Blochistan">Blochistan</option>
                    <option value="KPK">KPK</option> 
                    {/* Add other province options here */}
                  </select>
                </div>

                <div className="ZIP-INPUT">
                  <CustomInput label="ZIP Code*" inputType={"number"} />
                </div>
              </div>
            </div>
            {/* End of Shipping Information Section */}

            {/* Shipping Method Section */}
            <div className="shipping-method">
              <h3>Shipping Method</h3>
              {/* {shippingMethods.map((method) => ( */}
                <div className="shipping-option" >

                  <div className ="el1">

                  <input
                  //  style={{ marginTop: '100%' }}
                    type="radio"
                    // id={method.id}
                    name="shippingMethod"
                    // value={method.id} 

                    checked
                  />

                  </div>
                
                  <div className="el2"
                    style={{ paddingTop: '2%' }}
                  >
                   <p>Cash on Delivery.</p> 
                    </div>
                  {/* <label htmlFor={method.id}>
                    <div className="shipping-label">{method.label}</div>
                    <div className="shipping-cost">{method.cost}</div>
                  </label> */}
                </div>
               {/* ))} */}
            </div>
            {/* End of Shipping Method Section */}
            <div className="Buttons-Section">
              <div className="BackToCart">
                <button onClick={handleBackToCartClick} className="back-link">
                  <FaArrowLeft className="back-icon" />
                  Back To Cart
                </button>
              </div>

              <div className="Checkout-Button">
                <button
                  onClick={handleCheckoutClick}
                  className="roundbutton-checkout"
                >
                  {/* <span className="locksymbol-checkout">
                    <FontAwesomeIcon icon={faLock} />
                  </span> */}
                  Place Order
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="Parent">
          <div className="SecureCheckout">
            <div className="address-display">
              <h6>
                <strong>Shipping</strong> / Payment / Confirm Order
              </h6>
            </div>
            <div className="checkout-heading">
              <h2>Secure Checkout</h2>
              <hr />
            </div>
            <div className="contact-info">
              <h3>Contact Information</h3>
              <CustomInput label="Email*" inputType={"email"} />
              <CustomInput label="Email Confirmation*" inputType={"email"} />
              <div className="checkbox">
                <input type="checkbox" id="newsletter" />
                <label htmlFor="newsletter">
                  Sign up to get the latest news, deals, and product releases
                  sent to your inbox! We will not share your personal
                  information. Please review our Privacy Policy.
                </label>
              </div>

              <CustomInput label="Phone Number*" inputType={"number"} />

              <div className="checkbox">
                <input type="checkbox" id="marketingTexts" />
                <label htmlFor="marketingTexts">
                  Please sign me up to receive marketing text messages.
                </label>
              </div>
            </div>

            {/* Shipping Information Section */}
            <div className="shipping-info">
              <h3>Shipping Address</h3>
              <div className="FL-container">
                <CustomInput label="First Name*" type={"text"} />
                <CustomInput label="Last Name*" type={"text"} />
              </div>
              <CustomInput label="Address 1*" type={"text"} />
              <CustomInput label="Address 2" type={"text"} />
              <div className="CPZ-container">
                <div className="CITY-INPUT">
                  <CustomInput label="City*" type={"text"} />
                </div>

                <div>
                  <select className="province-dropdown">
                    {/* <option disabled >Province</option> */}
                    <option>Punjab</option>
                    <option value="Sindh">Sindh</option>
                    <option value="Blochistan">Blochistan</option>
                    <option value="KPK">KPK</option> 
                     {/* Add other province options here */}
                  </select>
                </div>

                <div className="ZIP-INPUT">
                  <CustomInput label="ZIP Code*" type={"number"} />
                </div>
              </div>
            </div>
            {/* End of Shipping Information Section */}

            {/* Shipping Method Section */}
            <div className="shipping-method">
              <h3>Shipping Method</h3>
              {/* {shippingMethods.map((method) => ( */}
                <div className="shipping-option" >

                  <div className ="el1">

                  <input
                    type="radio"
                    // id={method.id}
                    name="shippingMethod"
                    // value={method.id} 

                    checked
                  />

                  </div>
                
                  <div className="el2">
                   <p>Cash on Delivery.</p> 
                    </div>
                  {/* <label htmlFor={method.id}>
                    <div className="shipping-label">{method.label}</div>
                    <div className="shipping-cost">{method.cost}</div>
                  </label> */}
                </div>
               {/* ))} */}
            </div>
            {/* End of Shipping Method Section */}
            <div className="Buttons-Section">
              <div className="BackToCart">
                <button onClick={handleBackToCartClick} className="back-link">
                  <FaArrowLeft className="back-icon" />
                  Back To Cart
                </button>
              </div>

              <div className="Checkout-Button">
                <button
                  onClick={handleCheckoutClick}
                  className="roundbutton-checkout"
                >
                  {/* <span className="locksymbol-checkout">
                    <FontAwesomeIcon icon={faLock} />
                  </span> */}
                  Place Order
                </button>
              </div>
            </div>
          </div>
          <div className="OrderSummary">
            <OrderSummary shipping={5.99} tax={2.5} products={[dummyProduct]} />
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default CheckoutPage;
