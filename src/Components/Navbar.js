import React from "react";
import "./Navbar.css";
import location from "./location.png";
import { FaShoppingCart } from "react-icons/fa";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes, faChevronRight, faMapMarker } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import { Modal, Button } from "react-bootstrap";
import SubCat from "./SubCat";
import SearchBar from "./SearchBar.js";


const Navbar = ({shouldExecute = true}) => {
  const isSmallScreen = () => window.innerWidth < 950;

  const [isSticky, setIsSticky] = useState(false);
  const [smallScreen, setSmallScreen] = useState(isSmallScreen());
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      const header = document.getElementById("dummy");
      const sticky = header.offsetTop;
  
      if (window.pageYOffset > sticky) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };
  
    if (shouldExecute) {
      window.addEventListener("scroll", handleScroll);
    }
  
    return () => {
      if (shouldExecute) {
        window.removeEventListener("scroll", handleScroll);
      }
    };
  }, [shouldExecute]);
  

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

  const menuItems = [
    "All Products",
    "Mens Care",
    "Women Care",
    "Childeren",
    "Old Age",
  ];

  const dropdownContents = {

    "All Products" : <SubCat
    images={["https://www.nutrifactor.com.pk/cdn/shop/files/Gencell-Mockup.png?v=1692357376"]}
    categories={['Eyeys', 'Fertility', 'Hair']}
  />,
    "Mens Care" : <SubCat
    images={["https://www.nutrifactor.com.pk/cdn/shop/files/Gencell-Mockup.png?v=1692357376"]}
    categories={['Eyeys', 'Fertility', 'Hair']}
  />,
    "Women Care" : <SubCat
    images={["https://www.nutrifactor.com.pk/cdn/shop/files/Gencell-Mockup.png?v=1692357376"]}
    categories={['Eyeys', 'Fertility', 'Hair']}
  />,
    "Childeren" : <SubCat
    images={["https://www.nutrifactor.com.pk/cdn/shop/files/Gencell-Mockup.png?v=1692357376"]}
    categories={['Eyeys', 'Fertility', 'Hair']}
  />,
    "Old Age" : <SubCat
    images={["https://www.nutrifactor.com.pk/cdn/shop/files/Gencell-Mockup.png?v=1692357376"]}
    categories={['Eyeys', 'Fertility', 'Hair']}
  />,
  };

  const handleMenuItemClick = (item) => {
    console.log(`Clicked on ${item}`);
    navigate(`/category/${item}`);
  };

  const handleCartIconClick = () => {
    console.log(`Clicked on Cart`);
    navigate(`/CartPage`);
  };

  const handleLoginIconClick = () => {
    console.log(`Clicked on Login`);
    navigate(`/Login`);
  };

  function getDropdownContent(item) {
    return dropdownContents[item];
  }

  return (
    <>
      {smallScreen ? (
        <div id="FullNavbar" className={isSticky ? "stickyRes" : ""}>
          <nav className="navbar">
            <div className="navbar-left">
              <div className="hamburger-icon" onClick={toggleMenu}>
                <FontAwesomeIcon
                  icon={faBars}
                  style={{
                    fontSize: "24px",
                    color: "#24245a",
                    cursor: "pointer",
                  }}
                />
              </div>
            </div>
            <div className="navbar-middle">
              <a href="/">
                <img
                  src={"https://www.nutrifactor.com.pk/cdn/shop/files/Nutrifactor_Logo_110x.png?v=1630933817"}
                  id="Lg"
                  alt="Your Logo"
                  className={`logo ${isSticky ? "logoS" : ""}`}
                />
              </a>
            </div>
            <div className="navbar-right">
              <div className="child2" id="crt">
                <button onClick={handleCartIconClick} className="cart-btn">
                  <FaShoppingCart
                    style={{ fontSize: "24px", color: "#24245a" }}
                  />
                  <div className="cart-btn-text"></div>
                </button>
              </div>
            </div>
          </nav>
          {isMenuOpen ? (
      <Modal size="sm" animation={false} show={isMenuOpen} onHide={toggleMenu} dialogClassName={`custom-modal ${isMenuOpen ? '' : 'hidden'}`}>    <Modal.Header>
      <div className="modal-header-content">
        <div className="modal-title">
          <span>Main Menu</span>
        </div>
        <div className="close-button" onClick={toggleMenu}>
          <FontAwesomeIcon icon={faTimes} style={{ fontSize: "24px", color: "#24245a" }} />
        </div>
      </div>
    </Modal.Header>
    <Modal.Body>
      <ul className="menu-list">
        {menuItems.map((item, index) => (
          <li key={index}>
            {item}
            <FontAwesomeIcon
              icon={faChevronRight}
              style={{ fontSize: "12px", color: "#24245a", cursor: "pointer" }}
              onClick={() => handleMenuItemClick(item)}
            />
          </li>
        ))}
      </ul>
    </Modal.Body>
    <Modal.Footer>
      <Button className="login-button" onClick={handleLoginIconClick}>
        <FontAwesomeIcon icon={faUser} style={{ fontSize: "24px", color: "#24245a" }} />
        <span className="button-text">Log in</span>
      </Button>
      <Button className="store-button">
        <FontAwesomeIcon icon={faMapMarker} style={{ fontSize: "24px", color: "#24245a" }} />
        <span className="button-text">FIND A STORE</span>
      </Button>
    </Modal.Footer>
  </Modal>
          ) :
          null}

    {!isSticky && (
      <div className="search-bar_rs">
        <SearchBar />
      </div>
    )}
    <div id ="dummy"></div>
        </div>
      ) : (
        <div id="FullNavbar" className={isSticky ? "sticky" : ""}>
          <nav className="navbar">
            <div className="navbar-left">
              <a href="/">
                <img
                  src={"https://www.nutrifactor.com.pk/cdn/shop/files/Nutrifactor_Logo_110x.png?v=1630933817"}
                  alt="Your Logo"
                  className={`logo ${isSticky ? "logoS" : ""}`}
                />
              </a>
            </div>
            <div>
              <a href="/">
                <img src={location} alt="Your location" className="location" />
              </a>
              <div className="location-btn-text">FIND A STORE</div>
            </div>
            <div className="navbar-middle">
              <SearchBar />
            </div>
            <div className="navbar-right">
              <div className="child1">
                <button className="login-btn" onClick={handleLoginIconClick}>
                  <FontAwesomeIcon
                    icon={faUser}
                    style={{ fontSize: "48px", color: "#24245a" }}
                  />
                  <div className="login-btn-text">Log in</div>
                </button>
              </div>

              <div className="child2">
                <button className="cart-btn" onClick={handleCartIconClick}>
                  <FaShoppingCart
                    style={{ fontSize: "48px", color: "#24245a" }}
                  />
                  <div className="cart-btn-text">Cart</div>
                </button>
              </div>
            </div>
          </nav>
          <div id="navmenu" className="navbar-menu">
            {menuItems.map((item) => (
              <div
                key={item}
                className="menu-item"
                onClick={() => handleMenuItemClick(item)}
              >
                {item}
                <div className="dropdown-menu">
                {getDropdownContent(item)}
                </div>
              </div>
            ))}
          </div>
          <div id ="dummy"></div>
        </div>
      )}
    </>
  );
};

export default Navbar;
