// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { Link } from 'react-router-dom';

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

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal, Button } from "react-bootstrap";
import { useFormik } from "formik";
import axios from "axios";
import * as Yup from "yup";
// import {
//   addCategory,
//   editCategory,
//   getCategories,
//   addSubCategory, // Import the function to add subcategories
// } from "../../services/API/categoryApi";

export default function CategoriesAdmin() {
  const categorie = [
    {
      "id": 1,
      "name": "Category 1",
      "subcategories": [
        { "id": 101, "name": "Subcategory 1.1" },
        { "id": 102, "name": "Subcategory 1.2" }
      ]
    },
    {
      "id": 2,
      "name": "Category 2",
      "subcategories": [
        { "id": 201, "name": "Subcategory 2.1" },
        { "id": 202, "name": "Subcategory 2.2" }
      ]
    },
    {
      "id": 3,
      "name": "Category 3",
      "subcategories": [
        { "id": 301, "name": "Subcategory 3.1" },
        { "id": 302, "name": "Subcategory 3.2" }
      ]
    },
    {
      "id": 4,
      "name": "Category 4",
      "subcategories": [
        { "id": 401, "name": "Subcategory 4.1" },
        { "id": 402, "name": "Subcategory 4.2" }
      ]
    }
  ];
  
  const user = useSelector((state) => state.auth.login.currentUser);
  const dispatch = useDispatch();
  const [categoryName, setCategoryName] = useState("");
  const [subCategoryName, setSubCategoryName] = useState("");
  const [categories, setCategories] = useState(categorie);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [showTable, setShowTable] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);


  useEffect(() => {
    // Fetch categories when the component mounts
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      // Fetch categories from the API
      //const response = await getCategories(user.token);

      // Update the state with the fetched categories
      //setCategories(response.data.categories);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const handleAddCategory = async () => {
    // try {
    //   // Send a POST request to add a category
    //   const response = await axios.post(
    //     "YOUR_API_ENDPOINT/categories", // Replace with your actual API endpoint
    //     { name: categoryName },
    //     {
    //       headers: {
    //         Authorization: `Bearer ${user.token}`,
    //       },
    //     }
    //   );

    //   // Handle the response as needed
    //   console.log("Category added successfully:", response.data);

    //   // After adding, refetch the categories to update the list
    //   fetchCategories();

    //   // Clear the input field after adding the category
    //   setCategoryName("");
    // } catch (error) {
    //   console.error("Error adding category:", error);
    // }
  };

  const handleEditCategory = async (categoryId, newName) => {
    try {
      // Send a PUT request to edit a category
      // await editCategory(dispatch, categoryId, { name: newName }, user.token);

      // // After editing, refetch the categories to update the list
      // fetchCategories();
    } catch (error) {
      console.error("Error editing category:", error);
    }
  };

  const handleAddSubCategory = async () => {
    // try {
    //   // Send a POST request to add a subcategory
    //   await addSubCategory(dispatch, selectedCategoryId, {
    //     name: subCategoryName,
    //   }, user.token);

    //   // After adding, refetch the categories to update the list
    //   fetchCategories();

    //   // Clear the input field after adding the subcategory
    //   setSubCategoryName("");
    // } catch (error) {
    //   console.error("Error adding subcategory:", error);
    // }
  };

  const handleSubmitForm = () => {
    if (selectedCategoryId) {
      handleAddSubCategory();
     
    } else {
      handleAddCategory();
    }
  };


  

// this is below
const [selectedCategory, setSelectedCategory] = useState(null);

const handleCategoryChange = (event) => {
  const selectedCategoryId = event.target.value;
  const selectedCategory = categories.find(
    (category) => category.id === parseInt(selectedCategoryId)
  );
  setSelectedCategory(selectedCategory);
};

const formikEditSubcategory = useFormik({
  initialValues: {
    subcategoryName: "",
  },
  validationSchema: Yup.object({
    subcategoryName: Yup.string().required("Subcategory name is required"),
  }),
  onSubmit: (values) => {
    handleEditSubcategory(values.subcategoryName);
  },
});


const handleEditSubcategory = async (newName) => {
  try {
    // Implement the logic to edit subcategory here
    // Example: await editSubcategory(selectedCategory.id, selectedSubcategory.id, { name: newName }, user.token);

    // After editing, refetch the categories to update the list
    fetchCategories();

    // Close the modal
    setShowEditModal(false);
  } catch (error) {
    console.error("Error editing subcategory:", error);
  }
};

const handleEditButtonClick = (subcategory) => {
  // Set the selected subcategory and open the modal
  setSelectedSubcategory(subcategory);
  setShowEditModal(true);

  // Set the initial form values
  formikEditSubcategory.setValues({
    subcategoryName: subcategory.name,
  });
};

// Track whether to show the table
  return (
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
                <h4 className="card-title">Categories</h4>
                <div className="form-group">
                  <label>Select Category yeah:</label>
                  <select
                    className="form-control"
                    value={selectedCategoryId || ""}
                    onChange={(e) => setSelectedCategoryId(e.target.value)}
                  >
                    <option value="">Select a category</option>
                    {categories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label>{selectedCategoryId ? "Subcategory" : "Category"} Name:</label>
                  <input
                    type="text"
                    className="form-control"
                    value={selectedCategoryId ? subCategoryName : categoryName}
                    onChange={(e) =>
                      selectedCategoryId
                        ? setSubCategoryName(e.target.value)
                        : setCategoryName(e.target.value)
                    }
                  />
                </div>
                <button
                  className="btn btn-primary"
                  onClick={handleSubmitForm}
                >
                  {selectedCategoryId ? "Add Subcategory" : "Add Category"}
                </button>
              </div>
              <br></br>

              {/* sub catg ka table necchay hai bahi */}
              <div>
      <label htmlFor="categoryDropdown">Select Category: </label>
      <select
  id="categoryDropdown"
  onChange={handleCategoryChange}
  value={selectedCategory || ''}
>
  <option value="" disabled>Select a Category</option>
  {categories.map((category) => (
    <option key={category.id} value={category.id}>
      {`${category.id} - ${category.name}`}
    </option>
  ))}
</select>

{selectedCategory && (
  <div className="table-responsive">
    <table className="table table-striped table-bordered no-wrap">
      {/* Your table structure remains the same */}
      <thead>
        <tr>
          <th>ID</th>
          <th>Subcategory Name</th>
          <th>Edit</th>
        </tr>
      </thead>
      <tbody>
            {selectedCategory.subcategories.map((subcategory) => (
              <tr key={subcategory.id}>
                <td>{subcategory.id}</td>
                <td>{subcategory.name}</td>
                <td>
                  <button
                    style={{ cursor: "pointer", color: "white" }}
                    className="btn btn-info"
                    onClick={() => handleEditButtonClick(subcategory)}
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
    </table>
  </div>
)}
    </div>
            </div>
          </div>
        </div>
      </div>
      
      <footer className="footer text-center text-muted">
        All Rights Reserved by Adminmart. Designed and Developed by{" "}
        <a href="">MAKK</a>.
      </footer>
      <Modal
  show={showEditModal}
  onHide={() => setShowEditModal(false)}
  centered
>
  <Modal.Header closeButton>
    <Modal.Title>Edit Subcategory</Modal.Title>
  </Modal.Header>
  <Modal.Body>
    <form onSubmit={formikEditSubcategory.handleSubmit}>
      <div className="form-group">
        <label>Subcategory Name:</label>
        <input
          type="text"
          className="form-control"
          {...formikEditSubcategory.getFieldProps("subcategoryName")}
        />
        {formikEditSubcategory.touched.subcategoryName &&
          formikEditSubcategory.errors.subcategoryName && (
            <div className="text-danger">
              {formikEditSubcategory.errors.subcategoryName}
            </div>
          )}
      </div>
      <Button variant="primary" type="submit">
        Save Changes
      </Button>
    </form>
  </Modal.Body>
</Modal>

    </div>
  );
}
