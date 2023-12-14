import React, { useEffect, useState } from "react";
import "./Cart.css"; // Make sure to import your CSS file
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import CartOrderSummary from "./CartOrderSummary";
import CartProductCard from "./CartProductCard";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useNavigate } from "react-router-dom";

const dummyproducts = [
  {
    name: "Vitamin A",
    priceBefore: 13.99,
    priceAfter: 9.99,
    image: "https://www.nutrifactor.com.pk/cdn/shop/products/Vitamaxwomen30Metallic.png?v=1677239551",
  },
  {
    name: "Vitamin A",
    priceBefore: 13.99,
    priceAfter: 9.99,
    image: "https://www.nutrifactor.com.pk/cdn/shop/products/Vitamaxwomen30Metallic.png?v=1677239551",
  },
  {
    name: "Vitamin A",
    priceBefore: 19.99,
    priceAfter: 14.99,
    image: "https://www.nutrifactor.com.pk/cdn/shop/products/Vitamaxwomen30Metallic.png?v=1677239551",
  },
  {
    name: "Vitamin A",
    priceBefore: 11.49,
    priceAfter: 7.99,
    image: "https://www.nutrifactor.com.pk/cdn/shop/products/Vitamaxwomen30Metallic.png?v=1677239551",
  },
  {
    name: "Vitamin A",
    priceBefore: 24.99,
    priceAfter: 19.99,
    image: "https://www.nutrifactor.com.pk/cdn/shop/products/Vitamaxwomen30Metallic.png?v=1677239551",
  },
  {
    name: "Vitamin A",
    priceBefore: 9.99,
    priceAfter: 6.99,
    image: "https://www.nutrifactor.com.pk/cdn/shop/products/Vitamaxwomen30Metallic.png?v=1677239551",
  },
  {
    name: "Vitamin A",
    priceBefore: 29.99,
    priceAfter: 24.99,
    image: "https://www.nutrifactor.com.pk/cdn/shop/products/Vitamaxwomen30Metallic.png?v=1677239551",
  },
  {
    name: "Vitamin A",
    priceBefore: 17.99,
    priceAfter: 12.99,
    image: "https://www.nutrifactor.com.pk/cdn/shop/products/Vitamaxwomen30Metallic.png?v=1677239551",
  },
];

const Cart = ({ products = [] }) => {
  const navigate = useNavigate();
  const handleCheckoutClick = () => {
    console.log(`Clicked on Checkout`);
    navigate(`/CheckoutPage`);
  };

  const [itemss, setItemss] = useState(products);

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

  const [total, setTotal] = useState(0);
  const [quantityArray, setQuantityArray] = useState([]);
  const [bPriceArray, setBPriceArray] = useState([]);
  const [aPriceArray, setAPriceArray] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    debugger;
    if (currentIndex + 4 < dummyproducts.length) {
      setCurrentIndex(currentIndex + 4);
    }

    console.log("Next clicked");
  };

  const handlePrev = () => {
    if (currentIndex - 4 >= 0) {
      setCurrentIndex(currentIndex - 4);
    }
    console.log("Prev clicked");
  };

  const handleIncrement = (value, index) => {
    const updatedQuantityArray = [...quantityArray];
    updatedQuantityArray[index] = updatedQuantityArray[index] + 1;
    setQuantityArray(updatedQuantityArray);

    // Use updatedQuantityArray for all price calculations
    const productPriceBefore = products[index].priceBefore;
    const newBPrice = productPriceBefore * updatedQuantityArray[index];
    const updatedBPriceArray = [...bPriceArray];
    updatedBPriceArray[index] = parseFloat(
      newBPrice.toFixed(
        productPriceBefore.toString().split(".")[1]?.length || 0
      )
    );
    setBPriceArray(updatedBPriceArray);

    const productPriceAfter = products[index].priceAfter;
    const newAPrice = productPriceAfter * updatedQuantityArray[index];
    const updatedAPriceArray = [...aPriceArray];
    updatedAPriceArray[index] = parseFloat(
      newAPrice.toFixed(productPriceAfter.toString().split(".")[1]?.length || 0)
    );
    setAPriceArray(updatedAPriceArray);

    // Update the total based on updatedQuantityArray
    const calculatedTotal = updatedAPriceArray
      .reduce((acc, price) => acc + price, 0)
      .toFixed(
        Math.max(
          ...updatedAPriceArray.map(
            (value) => value.toString().split(".")[1]?.length || 0
          )
        )
      );
    setTotal(parseFloat(calculatedTotal));
  };

  const handleDecrement = (value, index) => {
    if (quantityArray[index] > 1) {
      const updatedQuantityArray = [...quantityArray];
      updatedQuantityArray[index] = updatedQuantityArray[index] - 1;
      setQuantityArray(updatedQuantityArray);

      // Use updatedQuantityArray for all price calculations
      const productPriceBefore = products[index].priceBefore;
      const newBPrice = productPriceBefore * updatedQuantityArray[index];
      const updatedBPriceArray = [...bPriceArray];
      updatedBPriceArray[index] = parseFloat(
        newBPrice.toFixed(
          productPriceBefore.toString().split(".")[1]?.length || 0
        )
      );
      setBPriceArray(updatedBPriceArray);

      const productPriceAfter = products[index].priceAfter;
      const newAPrice = productPriceAfter * updatedQuantityArray[index];
      const updatedAPriceArray = [...aPriceArray];
      updatedAPriceArray[index] = parseFloat(
        newAPrice.toFixed(
          productPriceAfter.toString().split(".")[1]?.length || 0
        )
      );
      setAPriceArray(updatedAPriceArray);

      // Update the total based on updatedQuantityArray
      const calculatedTotal = updatedAPriceArray
        .reduce((acc, price) => acc + price, 0)
        .toFixed(
          Math.max(
            ...updatedAPriceArray.map(
              (value) => value.toString().split(".")[1]?.length || 0
            )
          )
        );
      setTotal(parseFloat(calculatedTotal));
    }
  };

  // Call the calculateTotal function when the component mounts and when products change
  useEffect(() => {
    const initialQuantities = products.map((product) => product.quantity);
    setQuantityArray(initialQuantities);

    const initialBPrices = products.map((product) => product.priceBefore); // Fix variable name
    setBPriceArray(initialBPrices);

    const initialAPrices = products.map((product) => product.priceAfter); // Fix variable name
    setAPriceArray(initialAPrices);

    let calculatedTotal = 0;
    products.forEach((product) => {
      const productTotal = product.priceAfter * product.quantity;
      calculatedTotal += productTotal;
    });

    // Limit calculatedTotal to the maximum decimal places present in both numbers
    calculatedTotal = calculatedTotal.toFixed(
      Math.max(
        ...initialBPrices.map(
          (price) => price.toString().split(".")[1]?.length || 0
        ),
        ...initialAPrices.map(
          (price) => price.toString().split(".")[1]?.length || 0
        )
      )
    );

    // Update the total state
    setTotal(parseFloat(calculatedTotal));
  }, [products, itemss]);

  const handleRemoveButton = () => {
    const updatedProducts = [...itemss];
    // Remove the item at the specified index
    updatedProducts.splice(0, 1);
    // Update the state with the modified copy
    setItemss(updatedProducts);
  };

  return (
    <>
      <Navbar />
      <div className="header">
        <div className="text">YOUR CART</div>

        <div style={{ marginTop: "8px" }}>
          <div classname="secure-section">
            <span className="lock-symboll">
              <FontAwesomeIcon icon={faLock} />
              <span style={{ marginLeft: "5px" }}>SECURE</span>
            </span>
          </div>
        </div>
      </div>

      <div className="Middle">
        <div className="cartContent">
          {itemss.map((product, index) => (
            <div key={index} className="cartitem">
              <div className="cart-item-img">
                <img
                  src={product.image}
                  alt={product.name}
                  className="product-image"
                />
              </div>
              <div className="cart-item-content">
                <div className="productname">{product.name}</div>
                <div className="productpricequantity">
                  <div className="productprice">
                    <div className="product-price1">
                      ${product.priceAfter} each{" "}
                    </div>
                    <div className="product-price2">${product.priceBefore}</div>
                  </div>
                  <div className="quantityRecord">
                    <div className="round-button">
                      <button
                        className="minusButton"
                        onClick={() =>
                          handleDecrement(product.priceAfter, index)
                        }
                        // onClick={handleRemoveButton}
                      >
                        <span className="plus-minus-sign">-</span>{" "}
                      </button>
                      <span className="Quantity">{quantityArray[index]}</span>
                      <button
                        className="plusButton"
                        onClick={() =>
                          handleIncrement(product.priceAfter, index)
                        }
                      >
                        {" "}
                        <span className="plus-minus-sign">+</span>
                      </button>
                    </div>
                  </div>
                  {/* <div className="calculatedprice">
                                <div className="calculatedprice1">${aPriceArray[index]}</div>
                                <div className="calculatedprice2">${bPriceArray[index]}</div>
                            </div> */}
                </div>
                <div className="editRemove">
                  <button onClick={handleRemoveButton}>Remove</button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="Summary">
          <CartOrderSummary
            toggleCheckoutBtn={handleCheckoutClick}
            shipping={5.99}
            tax={0}
            total={total}
          />
        </div>
      </div>

      <div className="text1">Related Products</div>
      {/* <div className="contentfooter"> */}


        {/* <div className="contentfooter1">
          <p>Need Help? Call Us.</p>
          <p className="number">(866) 822-3670</p>
          <p>Monday - Friday</p>
          <p>7:30am - 4:30pm PST</p>
        </div>
        <div className="contentfooter2">
          <p>We stand behind every product we make.</p>
          <div className="contentfooterimg">
            <img src={imgg} alt="" className="footerimg" />
            <img src={imgg} alt="" className="footerimg" />
            <img src={imgg} alt="" className="footerimg" />
            <img src={imgg} alt="" className="footerimg" />
            <img src={imgg} alt="" className="footerimg" />
            <img src={imgg} alt="" className="footerimg" />
            <img src={imgg} alt="" className="footerimg" />
          </div>
        </div> */}
      {/* </div> */}

      <div className="cartproductCard">
        <button onClick={handlePrev} className="arrow-button">
          <span className="arrow-text">
            <FontAwesomeIcon icon={faChevronLeft} />
          </span>
        </button>
        {dummyproducts
          .slice(currentIndex, currentIndex + 4)
          .map((product, index) => (
            <CartProductCard key={index} product={product} />
          ))}
        <button onClick={handleNext} className="arrow-button">
          <span className="arrow-text">
            <FontAwesomeIcon icon={faChevronRight} />
          </span>
        </button>
      </div>

      {smallScreen ? (
        <div className="RespFooterCart">
          <Footer />
          <div className="StickyCheckoutBtn">
            <button onClick={handleCheckoutClick} className="StickyRoundButton">
              <span className="locksymbol">
                <FontAwesomeIcon icon={faLock} />
              </span>
              Checkout
            </button>
            <p style={{ marginTop: "2%", fontSize: "12px" }}>
              By placing your order, you agree to our <u>Terms & Conditions</u>.
            </p>
          </div>
        </div>
      ) : (
        <Footer />
      )}
    </>
  );
};

export default Cart;
