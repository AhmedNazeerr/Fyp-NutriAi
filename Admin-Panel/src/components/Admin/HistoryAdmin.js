import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import queryString from "query-string";
import axios from "axios";
import {
  createProduct,
  deleteProduct,
  getListProductFilter,
  getListProductPanigation,
} from "../../services/API/productApi";
import Pagination from "@mui/material/Pagination";
import { useFormik } from "formik";
import * as Yup from "yup";

export default function ProductsAdmin() {

  const dispatch = useDispatch();
  const [load, setLoad] = useState(false);
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [productPanigation, setProductPanigation] = useState([]);
  const [totalPage, setTotalPage] = useState(0);
  const [page, setPage] = useState(1);

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isUpdateModalVisible, setUpdateModalVisible] = useState(false);
  useEffect(() => {
    // Fetch all products when the component mounts
    fetchAllProducts();
    // Fetch categories when the component mounts
  }, []);

  const fetchAllProducts = async () => {
    try {
      // Fetch all products from the API
      const response = await axios.get("http://localhost:5000/api/v1/products/",{
        withCredentials:true
      }) // You may need to pass additional parameters based on your API
      // Update the state with the fetched products
      console.log(response.data)
      setProductPanigation(response.data.products.rows);
      setSelectedProduct(response.data.products.rows)
      setTotalPage(response.data.totalPages);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };
  useEffect(() => {
    // Fetch categories when the component mounts
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      // Fetch categories from the API
      //const response = await getCategories();

      // Update the state with the fetched categories
      //setCategories(response.data.categories);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const fetchSubcategories = async (categoryId) => {
    try {
      // Fetch subcategories for the selected category from the API
      //const response = await getSubcategoriesByCategory(categoryId);

      // Update the state with the fetched subcategories
      //setSubcategories(response.data.subcategories);
    } catch (error) {
      console.error("Error fetching subcategories:", error);
    }
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      price: "",
      discounted_price: "",
      features: "",
      how_to_apply: "",
      categoryId: "",
      subCategoryId: "",
      stock: "",
      images: [
        {
          url: "",
          imageno: 1,
        },
        {
          url: "",
          imageno: 2,
        },
      ],
    },
    validationSchema: Yup.object().shape({
      name: Yup.string().required("(*) Name is not empty"),
      price: Yup.number()
        .required("(*) Price is not empty")
        .positive("Price must be positive"),
      discounted_price: Yup.number()
        .required("(*) Discounted Price is not empty")
        .positive("Discounted Price must be positive"),
      features: Yup.string().required("(*) Features is not empty"),
      how_to_apply: Yup.string().required("(*) How to Apply is not empty"),
      categoryId: Yup.string().required("(*) Category is not empty"),
      subCategoryId: Yup.string().required("(*) Subcategory is not empty"),
      stock: Yup.number()
        .required("(*) Stock is not empty")
        .integer("Stock must be an integer")
        .min(0, "Stock must be at least 0"),
      images: Yup.array().of(
        Yup.object().shape({
          url: Yup.string().required("(*) Image URL is not empty"),
          imageno: Yup.number()
            .required("(*) Image number is not empty")
            .integer("Image number must be an integer")
            .min(1, "Image number must be at least 1"),
        })
      ),
    }),
    onSubmit: async () => {
      const {
        name,
        price,
        discounted_price,
        features,
        how_to_apply,
        categoryId,
        subCategoryId,
        stock,
        images,
      } = formik.values;
    
      // Convert price and discounted_price to numbers
      const numericPrice = parseFloat(price);
      const numericDiscountedPrice = parseFloat(discounted_price);
    
      const values = {
        name,
        price: numericPrice,
        discounted_price: numericDiscountedPrice,
        features,
        how_to_apply,
        categoryId: parseInt(categoryId, 10),
        subCategoryId: parseInt(subCategoryId, 10),
        stock: parseInt(stock, 10),
      };
    
      try {
        // Set loading to true before the asynchronous operation
        setLoad(true);
    
        // Send a POST request to create the product
        const response = await axios.post('http://localhost:5000/api/v1/products', {
          name,
        price: numericPrice,
        discounted_price: numericDiscountedPrice,
        features,
        how_to_apply,
        categoryId: parseInt(categoryId, 10),
        subCategoryId: parseInt(subCategoryId, 10),
        stock: parseInt(stock, 10),
        }, {
          withCredentials: true,
        });
    
        // Handle the response as needed
        console.log('Product added successfully:', response.data);
    
        // Reset the form after successful submission
        formik.resetForm();
        fetchAllProducts();
        // Fetch the updated product list or update the list as needed
        // fetchProductList();
    
        // Close the modal or handle UI changes as needed
        // closeAddProductModal();
      } catch (error) {
        console.error('Error creating product:', error);
      } finally {
        // Set loading to false in the finally block to handle success or error
        setLoad(false);
      }
    },
    
    
  });

  const handleCategoryChange = (categoryId) => {
    // Fetch subcategories when the category changes
    fetchSubcategories(categoryId);
  };
  // Placeholder functions; replace them with your actual logic
  const handleUpdateClick = (product) => {
    // Set the form values based on the selected product
    formik.setValues({
      name: product.name,
      price: product.price,
      discounted_price: product.discounted_price,
      features: product.features || "", // Update with appropriate field
      how_to_apply: product.how_to_apply || "", // Update with appropriate field
      categoryId: product.categoryId || "", // Update with appropriate field
      subCategoryId: product.subCategoryId || "", // Update with appropriate field
      stock: product.stock || "", // Update with appropriate field
      images: product.images || [{ url: '', imageno: 1 }, { url: '', imageno: 2 }],
    });
  
    // Fetch subcategories if the product has a category
    if (product.categoryId) {
      fetchSubcategories(product.categoryId);
    }
  
    // Show the modal
    setUpdateModalVisible(true);
  };
  
  
  const handleUpdateSubmit = async (values) => {
    // Convert price and discounted_price to numbers
    values.price = parseFloat(values.price);
    values.discounted_price = parseFloat(values.discounted_price);

    try {
      // Set loading to true before the asynchronous operation
      setLoad(true);

      // Implement the updateProduct function
      // You may need to adjust this based on your API or Redux logic
      // await updateProduct(dispatch, selectedProduct.id, values);

      // Hide the modal after successful update
      setUpdateModalVisible(false);
    } catch (error) {
      console.error("Error updating product:", error);
    } finally {
      // Set loading to false in the finally block to handle success or error
      setLoad(false);
    }
  };
  const handleDelete = (id) => {
    // Your delete logic here
    console.log(`Delete clicked for item ${id}`);
  };

  const handleChangePage = (newPage) => {
    // Your page change logic here
    console.log(`Page changed to ${newPage}`);
    setPage(newPage); // Update the page state
  };
  return (
    <>
    <div className="page-wrapper">
      <div className="page-breadcrumb">
        <div className="row">
          <div className="col-7 align-self-center">
            <h4 className="page-title text-truncate text-dark font-weight-medium mb-1">
              Basic Initialisation
            </h4>
            <div className="d-flex align-items-center">
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb m-0 p-0">
                  <li className="breadcrumb-item">
                    <a href="/" className="text-muted">
                      Home
                    </a>
                  </li>
                  <li
                    className="breadcrumb-item text-muted active"
                    aria-current="page"
                  >
                    Table
                  </li>
                </ol>
              </nav>
            </div>
          </div>
        </div>
      </div>

      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title">Products</h4>
                <div className="d-flex">
                  <input
                    className="form-control w-25"
                    type="text"
                    placeholder="Enter Search!"
                  />
                  <div>
                    <button
                      type="button"
                      className="btn btn-success mx-2"
                      data-toggle="modal"
                      data-target=".bd-example-modal-lg"
                    >
                      Add Product
                    </button>

                    <div
                      className="modal fade bd-example-modal-lg"
                      tabIndex={-1}
                      role="dialog"
                      aria-labelledby="myLargeModalLabel"
                      aria-hidden="true"
                    >
 <div className="modal-dialog modal-lg">
                <form onSubmit={formik.handleSubmit}>
                <div className="modal-content">
  <div className="modal-header">
    <h5 className="modal-title" id="exampleModalLongTitle">
      Add Product
    </h5>
    <button
      type="button"
      className="close"
      data-dismiss="modal"
      aria-label="Close"
    >
      <span aria-hidden="true">×</span>
    </button>
  </div>

  <div className="container-fluid">
    <div className="row p-3">
      <div className="col-6">
        {/* Left column */}
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            name="name"
            className="form-control"
            id="name"
            placeholder="Enter name"
            onChange={formik.handleChange}
          />
          <p className="text-2xs text-danger">
            {formik.errors.name}
          </p>
        </div>

        <div className="form-group">
          <label htmlFor="price">Price:</label>
          <input
            name="price"
            type="number"
            className="form-control"
            id="price"
            placeholder="Enter price"
            onChange={formik.handleChange}
          />
          <p className="text-2xs text-danger">
            {formik.errors.price}
          </p>
        </div>

        <div className="form-group">
          <label htmlFor="discounted_price">Discounted Price:</label>
          <input
            name="discounted_price"
            type="number"
            className="form-control"
            id="discounted_price"
            placeholder="Enter discounted price"
            onChange={formik.handleChange}
          />
          <p className="text-2xs text-danger">
            {formik.errors.discounted_price}
          </p>
        </div>

        <div className="form-group">
          <label htmlFor="features">Features:</label>
          <input
            name="features"
            type="text"
            className="form-control"
            id="features"
            placeholder="Enter features"
            onChange={formik.handleChange}
          />
          <p className="text-2xs text-danger">
            {formik.errors.features}
          </p>
        </div>

        <div className="form-group">
          <label htmlFor="how_to_apply">How to Apply:</label>
          <input
            name="how_to_apply"
            type="text"
            className="form-control"
            id="how_to_apply"
            placeholder="Enter how to apply"
            onChange={formik.handleChange}
          />
          <p className="text-2xs text-danger">
            {formik.errors.how_to_apply}
          </p>
        </div>
      </div>

      <div className="col-6">
  {/* Right column */}
  <div className="form-group">
    <label htmlFor="categoryId">Category ID:</label>
    <input
      name="categoryId"
      type="number"
      className="form-control"
      value={formik.values.categoryId}
      onChange={(e) => {
        formik.handleChange(e);
        const categoryId = parseInt(e.target.value, 10);
        formik.setFieldValue('categoryId', categoryId);
      }}
    />
    <p className="text-2xs text-danger">
      {formik.errors.categoryId}
    </p>
  </div>

  <div className="form-group">
    <label htmlFor="subCategoryId">Subcategory ID:</label>
    <input
      name="subCategoryId"
      type="number"
      className="form-control"
      value={formik.values.subCategoryId}
      onChange={(e) => {
        formik.handleChange(e);
        const subCategoryId = parseInt(e.target.value, 10);
        formik.setFieldValue('subCategoryId', subCategoryId);
      }}
    />
    <p className="text-2xs text-danger">
      {formik.errors.subCategoryId}
    </p>
  </div>

  <div className="form-group">
    <label htmlFor="stock">Stock:</label>
    <input
      name="stock"
      type="number"
      className="form-control"
      id="stock"
      placeholder="Enter stock"
      onChange={formik.handleChange}
    />
    <p className="text-2xs text-danger">
      {formik.errors.stock}
    </p>
  </div>
</div>


    </div>
  </div>

  <div className="modal-footer">
    <button
      type="button"
      className="btn btn-secondary"
      data-dismiss="modal"
    >
      Close
    </button>
    <button type="submit" className="btn btn-success">
      Save changes
    </button>
  </div>
</div>

                            </form>
                       
                          </div>
                      </div>
                    </div>
                  </div>
                  
                </div>
                </div>
                <br />

                <div className="table-responsive">
                  <table className="table table-striped table-bordered no-wrap">
                  <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Price</th>
              <th>Discounted Price</th> {/* New column for discounted price */}
              <th>Image</th>
              <th>Edit</th>
            </tr>
          </thead>
          <tbody>
            {selectedProduct?.map((item, index) => {
              return (
                <tr key={index}>
                  <td>{item.id}</td>
                  <td>{item.name}</td>
                  <td>{item.price}</td>
                  <td>{item.discounted_price}</td> {/* Display discounted price */}
                  <td>
                    {/* Replace this with your actual image rendering logic */}
                    <img
                      src="https://via.placeholder.com/60"
                      style={{ height: "60px", width: "60px" }}
                      alt={item.name}
                    />
                  </td>
                  <td>
                  <button
  type="button"
  style={{ cursor: "pointer", color: "white" }}
  className="btn btn-danger"
  onClick={() => handleUpdateClick(item)}
>
  Update
</button>

                    &nbsp;
                    <button
                      type="button"
                      style={{ cursor: "pointer", color: "white" }}
                      className="btn btn-danger"
                      onClick={() => handleDelete(item.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
                  </table>
                  <Pagination
                    count={totalPage}
                    page={page}
                    onChange={handleChangePage}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      <footer className="footer text-center text-muted">
        All Rights Reserved by Adminmart. Designed and Developed by{" "}
        <a href="">MAKK</a>.
      </footer>
    </>
  );
}

// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import queryString from "query-string";
// import {
//   createProduct,
//   deleteProduct,
//   getListProductFilter,
//   getListProductPanigation,
// } from "../../services/API/productApi";
// import Pagination from "@mui/material/Pagination";
// import { useFormik } from "formik";
// import * as Yup from "yup";
// export default function ProductsAdmin() {
//   const productPanigation = useSelector(
//     (state) => state.product.productPanigation?.allProductPanigation
//   );
//   const productFilter = useSelector(
//     (state) => state.product.productFilter?.allProductFilter
//   );

//   const [page, setPage] = useState(1);
//   const [sort, setSort] = useState("default");
//   const [totalPage, setTotalPage] = useState();
//   const [updateProductId, setUpdateProductId] = useState(null);

//   const [pagination, setPagination] = useState({
//     page: "1",
//     size: "9",
//     search: "",
//     category: "all",
//   });
//   const dispatch = useDispatch();
//   const [load, setLoad] = useState(false);

//   useEffect(() => {
//     (async () => {
//       const params = {
//         page: pagination.page,
//         size: pagination.size,
//         search: pagination.search,
//         category: pagination.category,
//       };

//       const query = queryString.stringify(params);
//       const newQuery = "?" + query;
//       await getListProductPanigation(dispatch, newQuery);
//     })();
//   }, [pagination, page, sort, load]);

//   useEffect(() => {
//     (async () => {
//       const params = {
//         page: "",
//         size: "",
//         search: pagination.search,
//         category: pagination.category,
//       };

//       const query = queryString.stringify(params);
//       const newQuery = "?" + query;
//       await getListProductFilter(dispatch, newQuery);
//     })();
//   }, [page, pagination, sort]);

//   useEffect(() => {
//     let totalProduct = productFilter?.length;
//     totalProduct = Math.ceil(totalProduct / pagination.size);
//     setTotalPage(totalProduct);
//   }, [page, pagination, sort, productFilter]);

//   const handleChangePage = (e, value) => {
//     e.preventDefault();
//     window.scrollTo(0, 0);

//     setPage(value);

//     setPagination({
//       page: value,
//       size: pagination.size,
//       search: pagination.search,
//       category: pagination.category,
//     });
//   };

//   const formik = useFormik({
//     initialValues: {
//       name: "",
//       description: "",
//       price: "",
//       img1: "",
//       img2: "",
//       img3: "",
//       img4: "",
//       category: "",
//       originalPrice: "",
//       promotionPercent: "",
//     },
//     validationSchema: Yup.object().shape({
//       name: Yup.string().required("(*) Full name is not empty"),
//       description: Yup.string().required("(*) Description is not empty"),
//       price: Yup.string()
//         .required("(*) Price is not empty")
//         .matches(/^[0-9]+$/, "price is invalid"),
//       img1: Yup.string().required("(*) Img1 is not empty"),
//       img2: Yup.string().required("(*) Img2 name is not empty"),
//       img3: Yup.string().required("(*) Img3 name is not empty"),
//       img4: Yup.string().required("(*) Img4 name is not empty"),
//       category: Yup.string().required("(*) category is not empty"),
//       originalPrice: Yup.string()
//         .required("(*) originalPrice is not empty")
//         .matches(/^[0-9]+$/, "originalPrice is invalid"),
//       promotionPercent: Yup.string()
//         .required("(*) promotionPercent is not empty")
//         .matches(/^[0-9]+$/, "promotionPercent is invalid"),
//     }),
//     onSubmit: async (value) => {
//       await createProduct(dispatch, value);
//       setLoad(!load);
//     },
//   });

//   const handleDelete = async (id) => {
//     await deleteProduct(dispatch, id);
//   };
//   const handleUpdateClick = (id) => {
//     setUpdateProductId(id);
//   };

//   return (
//     <div className="page-wrapper">
//       <div className="page-breadcrumb">
//         <div className="row">
//           <div className="col-7 align-self-center">
//             <h4 className="page-title text-truncate text-dark font-weight-medium mb-1">
//               Basic Initialisation
//             </h4>
//             <div className="d-flex align-items-center">
//               <nav aria-label="breadcrumb">
//                 <ol className="breadcrumb m-0 p-0">
//                   <li className="breadcrumb-item">
//                     <a href="/" className="text-muted">
//                       Home
//                     </a>
//                   </li>
//                   <li
//                     className="breadcrumb-item text-muted active"
//                     aria-current="page"
//                   >
//                     Table
//                   </li>
//                 </ol>
//               </nav>
//             </div>
//           </div>
//         </div>
//       </div>
//       <div className="container-fluid">
//         <div className="row">
//           <div className="col-12">
//             <div className="card">
//               <div className="card-body">
//                 <h4 className="card-title">Products</h4>
//                 <div className="d-flex">
//                   <input
//                     className="form-control w-25"
//                     type="text"
//                     placeholder="Enter Search!"
//                   />
//                   <div>
//                     <button
//                       type="button"
//                       className="btn btn-success mx-2"
//                       data-toggle="modal"
//                       data-target=".bd-example-modal-lg"
//                     >
//                       Add Product
//                     </button>

//                     <div
//                       className="modal fade bd-example-modal-lg"
//                       tabIndex={-1}
//                       role="dialog"
//                       aria-labelledby="myLargeModalLabel"
//                       aria-hidden="true"
//                     >
//                       <div className="modal-dialog modal-lg">
//                         <form onSubmit={formik.handleSubmit}>
//                           <div className="modal-content">
//                             <div className="modal-header">
//                               <h5
//                                 className="modal-title"
//                                 id="exampleModalLongTitle"
//                               >
//                                 Add Product
//                               </h5>
//                               <button
//                                 type="button"
//                                 className="close"
//                                 data-dismiss="modal"
//                                 aria-label="Close"
//                               >
//                                 <span aria-hidden="true">×</span>
//                               </button>
//                             </div>

//                             <div className="container-fluid">
//                               <div className="row p-3">
//                                 <div className="col-6">
//                                   <div className="form-group">
//                                     <label htmlFor="name">name</label>
//                                     <input
//                                       type="text"
//                                       name="name"
//                                       className="form-control"
//                                       id="name"
//                                       placeholder="Enter name"
//                                       onChange={formik.handleChange}
//                                     />
//                                     <p className="text-2xs text-danger">
//                                       {formik.errors.name}
//                                     </p>
//                                   </div>
//                                   <div className="form-group">
//                                     <label htmlFor="description">
//                                       description
//                                     </label>
//                                     <input
//                                       name="description"
//                                       type="text"
//                                       className="form-control"
//                                       id="description"
//                                       placeholder="Enter description"
//                                       onChange={formik.handleChange}
//                                     />
//                                     <p className="text-2xs text-danger">
//                                       {formik.errors.description}
//                                     </p>
//                                   </div>
//                                   <div className="form-group">
//                                     <label htmlFor="price">price</label>
//                                     <input
//                                       name="price"
//                                       type="text"
//                                       className="form-control"
//                                       id="price"
//                                       placeholder="Enter price"
//                                       onChange={formik.handleChange}
//                                     />
//                                     <p className="text-2xs text-danger">
//                                       {formik.errors.price}
//                                     </p>
//                                   </div>
//                                   <div className="form-group">
//                                     <label htmlFor="img1">img1</label>
//                                     <input
//                                       name="img1"
//                                       type="text"
//                                       className="form-control"
//                                       id="img1"
//                                       placeholder="Enter img1"
//                                       onChange={formik.handleChange}
//                                     />
//                                     <p className="text-2xs text-danger">
//                                       {formik.errors.img1}
//                                     </p>
//                                   </div>
//                                   <div className="form-group">
//                                     <label htmlFor="img2">img2</label>
//                                     <input
//                                       name="img2"
//                                       type="text"
//                                       className="form-control"
//                                       id="img2"
//                                       placeholder="Enter img2"
//                                       onChange={formik.handleChange}
//                                     />
//                                     <p className="text-2xs text-danger">
//                                       {formik.errors.img2}
//                                     </p>
//                                   </div>
//                                 </div>
//                                 <div className="col-6">
//                                   <div className="form-group">
//                                     <label htmlFor="img3">img3</label>
//                                     <input
//                                       name="img3"
//                                       type="text"
//                                       className="form-control"
//                                       id="img3"
//                                       placeholder="Enter img3"
//                                       onChange={formik.handleChange}
//                                     />
//                                     <p className="text-2xs text-danger">
//                                       {formik.errors.img3}
//                                     </p>
//                                   </div>
//                                   <div className="form-group">
//                                     <label htmlFor="img4">img4</label>
//                                     <input
//                                       name="img4"
//                                       type="text"
//                                       className="form-control"
//                                       id="img4"
//                                       placeholder="Enter img4"
//                                       onChange={formik.handleChange}
//                                     />
//                                     <p className="text-2xs text-danger">
//                                       {formik.errors.img4}
//                                     </p>
//                                   </div>
//                                   <div className="form-group">
//                                     <label htmlFor="category">category</label>
//                                     <input
//                                       name="category"
//                                       type="text"
//                                       className="form-control"
//                                       id="category"
//                                       placeholder="Enter category"
//                                       onChange={formik.handleChange}
//                                     />
//                                     <p className="text-2xs text-danger">
//                                       {formik.errors.category}
//                                     </p>
//                                   </div>
//                                   <div className="form-group">
//                                     <label htmlFor="originalPrice">
//                                       originalPrice
//                                     </label>
//                                     <input
//                                       name="originalPrice"
//                                       type="text"
//                                       className="form-control"
//                                       id="originalPrice"
//                                       placeholder="Enter originalPrice"
//                                       onChange={formik.handleChange}
//                                     />
//                                     <p className="text-2xs text-danger">
//                                       {formik.errors.originalPrice}
//                                     </p>
//                                   </div>
//                                   <div className="form-group">
//                                     <label htmlFor="promotionPercent">
//                                       promotionPercent
//                                     </label>
//                                     <input
//                                       name="promotionPercent"
//                                       type="text"
//                                       className="form-control"
//                                       id="promotionPercent"
//                                       placeholder="Enter promotionPercent"
//                                       onChange={formik.handleChange}
//                                     />
//                                     <p className="text-2xs text-danger">
//                                       {formik.errors.promotionPercent}
//                                     </p>
//                                   </div>
//                                 </div>
//                               </div>
//                             </div>
//                             <div className="modal-footer">
//                               <button
//                                 type="button"
//                                 className="btn btn-secondary"
//                                 data-dismiss="modal"
//                               >
//                                 Close
//                               </button>
//                               <button type="submit" className="btn btn-success">
//                                 Save changes
//                               </button>
//                             </div>
//                           </div>
//                         </form>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//                 <br />

//                 <div className="table-responsive">
//                   <table className="table table-striped table-bordered no-wrap">
//                     <thead>
//                       <tr>
//                         <th>ID</th>
//                         <th>Name</th>
//                         <th>Price</th>
//                         <th>Image</th>
//                         <th>Category</th>
//                         <th>Edit</th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {productPanigation?.map((item, index) => {
//                         return (
//                           <tr key={index}>
//                             <td>{item.id}</td>
//                             <td>{item.name}</td>
//                             <td>{item.price}</td>
//                             <td>
//                               <img
//                                 src={item.img1}
//                                 style={{ height: "60px", width: "60px" }}
//                                 alt={item.img1}
//                               />
//                             </td>
//                             <td>{item.category}</td>
//                             <td>
//                             <button
//                             type="button"
//                             style={{ cursor: "pointer", color: "white" }}
//                             className="btn btn-danger"
//                       onClick={() => handleUpdateClick(item.id)} // Pass the product ID to update form
//                     >
//                       Update
//                     </button>
//                               &nbsp;
//                               <button
//                                 type="button"
//                                 style={{ cursor: "pointer", color: "white" }}
//                                 className="btn btn-danger"
//                                 onClick={() => handleDelete(item.id)}
//                               >
//                                 Delete
//                               </button>
//                             </td>
//                           </tr>
//                         );
//                       })}
//                     </tbody>
//                   </table>
//                   <Pagination
//                     count={totalPage}
//                     page={page}
//                     onChange={handleChangePage}
//                   />
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
        
//       </div>
//       <footer className="footer text-center text-muted">
//         All Rights Reserved by Adminmart. Designed and Developed by{" "}
//         <a href="">MAKK</a>.
//       </footer>
//     </div>
//   );
// }