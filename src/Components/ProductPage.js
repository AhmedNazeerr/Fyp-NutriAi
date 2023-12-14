import React from "react";
import 'bootstrap/dist/css/bootstrap.css';
import Navbar from "./Navbar";
import { useParams } from "react-router-dom";
import "./ProductPage.css"
import { useNavigate } from "react-router-dom";
import ReviewsPP from "./ReviewsPP";
import PageSections from "./PageSections";
import Footer from "./Footer";
import ViewItem from "./ViewItem";

const productData = {
  name: "Product Name",
  images: [
    "https://www.nutrifactor.com.pk/cdn/shop/products/Vitamaxwomen30Metallic.png?v=1677239551",
    "https://www.nutrifactor.com.pk/cdn/shop/products/Vitamaxwomen30Metallic.png?v=1677239551",
    "https://www.nutrifactor.com.pk/cdn/shop/products/Vitamaxwomen30Metallic.png?v=1677239551",
    "https://www.nutrifactor.com.pk/cdn/shop/products/Vitamaxwomen30Metallic.png?v=1677239551",
    "https://www.nutrifactor.com.pk/cdn/shop/products/Vitamaxwomen30Metallic.png?v=1677239551",
    "https://www.nutrifactor.com.pk/cdn/shop/products/Vitamaxwomen30Metallic.png?v=1677239551",
    "https://www.nutrifactor.com.pk/cdn/shop/products/Vitamaxwomen30Metallic.png?v=1677239551"
  ],
  ratings: {
    reviews: 50, // Number of reviews
    rating: 5 // Average rating
  },
  price: {
    sale: 79.99,
    old: 99.99,
    discount: 30
  },
  productCode: "ABC123",
  sizes: [
    {
      name: "Size 1 (10 OZ)",
      image: "https://www.nutrifactor.com.pk/cdn/shop/products/Vitamaxwomen30Metallic.png?v=1677239551"
    },
    {
      name: "Size 2 (16 OZ)",
      image: "https://www.nutrifactor.com.pk/cdn/shop/products/Vitamaxwomen30Metallic.png?v=1677239551"
    },
    {
      name: "Size 3 (32 OZ)",
      image: "https://www.nutrifactor.com.pk/cdn/shop/products/Vitamaxwomen30Metallic.png?v=1677239551"
    }
  ],
  stockStatus: "In Stock" // or "Out of Stock"
};

const dummyProduct = {
    FeatureContent: "These are features",
    ApplyContent: "This is how to apply content",
    FAQContent: "This is FAQ content"
  }

const ProductPage = () => {

  const navigate = useNavigate();
  const { productName } = useParams();

  // const [isLoading, setIsLoading] = useState(true);

  // useEffect(() => {
  //   // MAKE IT ASYNC AND LOAD YOUR DATA HERE
  //   setTimeout(() => {
  //     setIsLoading(false);
  //   }, 3000);
  // }, []);

  // if (isLoading) {
  //   return (
  //     <div className="loading-container">
  //       <img src={process.env.PUBLIC_URL + '/assets/logo.png'} alt="Logo" className="logo" />
  //       <div className="spinner"></div>
  //     </div>
  //   );
  // }
    const handleProductItemClick = (Pname) => {
      console.log(`Clicked on ${Pname}`);
      navigate(`/Products/${Pname}`);
    };
    const products = [
        {
          title: 'Product 1',
          description: 'This is the description of the product',
          image: "https://www.nutrifactor.com.pk/cdn/shop/products/Vitamaxwomen30Metallic.png?v=1677239551",
          oldprice: '$20.00',
          newprice: 'From $0.00',
        },
        {
          title: 'Product 2',
          description: 'This is the description of the product',
          image: "https://www.nutrifactor.com.pk/cdn/shop/products/Vitamaxwomen30Metallic.png?v=1677239551",
          oldprice: '$10.00',
          newprice: 'From $0.00',
        },
        {
          title: 'Product 3',
          description: 'This is the description of the product',
          image: "https://www.nutrifactor.com.pk/cdn/shop/products/Vitamaxwomen30Metallic.png?v=1677239551",
          oldprice: '$19.00',
          newprice: 'From $0.00',
        },
        {
            title: 'Product 4',
            description: 'This is the description of the product',
            image: "https://www.nutrifactor.com.pk/cdn/shop/products/Vitamaxwomen30Metallic.png?v=1677239551",
            oldprice: '$19.00',
            newprice: 'From $0.00',
          }
      ]

      
    return (
    <div>
      <Navbar />
      <div className="product-display">
      <h2>Home /  {productName} </h2>
      </div>
      <ViewItem productData={productData} />
      <div className="Section-Container">
        <PageSections content = {dummyProduct}/>
      </div>

      <div className="FBW">
        <div className="FBW-headingWrapper">
            <h1 className="FBW-heading">
            Frequently Bought With
            </h1>
            <div className="d-flexPP">
            {products.map((product, index) => (
            <div key={index} onClick={() => handleProductItemClick(product.title)} className="product-cardPP">
            <div className="card-body">
              <img src={"https://www.nutrifactor.com.pk/cdn/shop/products/Vitamaxwomen30Metallic.png?v=1677239551"} className="card-img-top" alt={product.title} />
              <h4 className="card-title">{product.title}</h4>
              <p className="card-description">{product.description}</p>
              <div className="price">
                <p className="newprice">{product.newprice}</p>
                <p className="oldprice">{product.oldprice}</p>
              </div>
            </div>
          </div>
          
        ))}
      </div>
        </div>
      </div>

      <div className="ReviewsPP-wrapper">
      <ReviewsPP count = '271'/>
      </div>
      
   

     <Footer />

    </div>
  );
};

export default ProductPage;