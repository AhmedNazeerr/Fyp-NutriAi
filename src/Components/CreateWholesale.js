import React from 'react';
import './CreateWholesale.css';
import wholesaleimg from "./WholesalePic.jpg"
import Navbar from './Navbar';
import Footer from './Footer';
import CustomInput from './CustomInput';


const CreateWholesale = () => {

  const headings = [
    "Auto Detailing Supplies: Wholesale",
  ];

  return (
    <div>
     <Navbar></Navbar>
     <div className="imgTOP-container">
        <img src= {wholesaleimg} alt="Blog" />
    </div>
   
    <div className="wholesale-display">
        <h2>Home / Auto Detailing Supplies: Wholesale </h2>
    </div>
    <div className="wholesale-page">
      <div className="contentWholesale">
        {headings.map((heading, index) => (
          <div style= {{marginBottom: "5%"}} key={index}>
            {index === 0 && (
              <div className='InfoRulesWholesale'> 

              <div className='WholesaleHeading'>
              <h1>{heading}</h1>
              </div>
              <p>
                As requested by our customers, Ethos now offers high quality, professional-grade products for use in your car detail or mobile car detailing business. We supply the best auto detailing products ranging from car waxes to ceramic coatings, microfiber cloths, accessories and more to help you grow your detailing business.
                <br /><br />
                Ethos Wholesale members receive access to exclusive pricing and incentives which enable car detailers to help grow their businesses by adding both profit and quality results to their portfolio of service offerings.
                <br /><br />
                Want to provide even more value to your customers and earn some extra profit? Sell them easy to use maintenance products to ensure they properly maintain your car detailing, ceramic coating or PPF service.
                <br /><br />
                Register below to apply to our FREE wholesale program for access to high quality products at unbeatable pricing.
              </p>
                <p>
                <strong>All Ethos Wholesale Members Receive*:</strong>
                </p>
                <ul>
                  <li>
                  Additional 20% Off All* Detailing Chemicals (*excludes special deals)
                  </li>
                  <li>
                  Additional 20% Off All* Microfibers, Pads & Accessories (*excludes special deals)
                  </li>
                  <li>
                  Additional 20% Off Already Discounted Bundles & Kits (excludes sales, clearance items, and special deals)
                  </li>                  
                  <li>
                  Additional 20% Off All Ethos Branded Hats, Promotional Items, T-Shirts, & Stickers                  </li>                  
                  <li>
                  Certification and access to install Graphene Matrix PRO*, backed by our manufacturer 10 year warranty.
                  </li>
                </ul>


                <p>
                <strong>Wholesale Membership Rules:</strong>
                </p>
                <ul>
                  <li>
                  Ethos Wholesale Membership is open to all types of professional businesses with an active / verifiable website, Facebook page, Instagram feed, other Social Media, State Business Registration Number or other means of validating an active status.
                  </li>
                  <li>
                  Approval of membership is at the discretion of Ethos Car Care based upon the business validation information provided during the application process.  Ethos Car Care also reserves the right to cancel membership at any time.
                  </li>
                  <li>
                  Online coupon codes cannot be “stacked”. Only one coupon code may be used per order. Use the coupon code that works best for you for any particular order
                  </li>                  
                  <li>
                  *Ethos Graphene Matrix PRO is available ONLY to approved and authorized installers.                 
                   </li>                  
                </ul>

              </div>
            )}
          </div>
        ))}
      </div>
    </div>
        <div className='FormWholesale'>
            <div className="contact-info">
              <h3>Contact Information</h3>
              <CustomInput label="First Name*"/>
              <CustomInput label="Last Name*"/>
              <CustomInput label="Email*"/>
              {/* <div className="checkbox">
                <input type="checkbox" id="newsletter" />
                <label htmlFor="newsletter">
                 Do you already have a Customer account with us? (Tick if you do) *
                </label>
              </div> */}
              {/* <CustomInput label="If you DO already have a customer account with us, what is the email address associated with the account? "/> */}
              <CustomInput label="Company name *"/>
              <CustomInput label="Phone Number *"/>
              {/* <CustomInput label="Tax ID/ABN/VAT Number "/> */}
              <CustomInput label="Website "/>

            </div>
             
              {/* Shipping Information Section */}
              <div className="shipping-info">
              <h3 style={{marginBottom: "5%"}}>Shipping Address</h3>
              <CustomInput label="Share some details about your business for identity verification. "/>
              <CustomInput label="Address 1*"/>
              <CustomInput label="Address 2"/>
              <div className="CPZ-container">
  
              <div className="CITY-INPUT">
              <CustomInput label="City*"/>
              </div>
  
                <div>
                <select className="province-dropdown">
                  <option>Province</option>
                  {/* Add other province options here */}
                </select>
                </div>
  
                <div className="ZIP-INPUT">
                <CustomInput label="ZIP Code*"/>
                </div>
              </div>

              <div className="checkbox">
                <input type="checkbox" id="newsletter" />
                <label htmlFor="newsletter">
                 I accept the Terms and Conditions *
                </label>
              </div>
              <button className="roundbutton-wholesale">
                Apply for an account
              </button>
            </div>
            </div>




    <Footer></Footer>
    </div>
  );
}

export default CreateWholesale;
