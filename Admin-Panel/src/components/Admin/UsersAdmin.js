// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { deleteUser, getListUser } from "../../services/API/userApi";

// export default function UsersAdmin() {
//   const user = useSelector((state) => state.auth.login.currentUser);
//   const listUser = useSelector((state) => state.user.users.isUser);
//   const dispatch = useDispatch();
//   const [load, setLoad] = useState(false);

//   useEffect(() => {
//     getListUser(dispatch, user.token);
//   }, [load]);

//   const handleDeleteUser = async (id) => {
//     await deleteUser(dispatch, id, user.token);
//     setLoad(!load);
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
//                 <h4 className="card-title">Users</h4>
//                 <input
//                   className="form-control w-25"
//                   type="text"
//                   placeholder="Enter Search!"
//                 />
//                 <br />
//                 <div className="table-responsive">
//                   <table className="table table-striped table-bordered no-wrap">
//                     <thead>
//                       <tr>
//                         <th>ID</th>
//                         <th>Fullname</th>
//                         <th>Email</th>
//                         <th>Phone</th>
//                         <th>User Type</th>
//                         <th>Edit</th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {listUser.map((user, index) => {
//                         return (
//                           <tr key={index}>
//                             <td>{user.id}</td>
//                             <td>{user.fullname}</td>
//                             <td>{user.email}</td>
//                             <td>{user.phone}</td>
//                             <td>
//                               {user.admin === 1 ? "Admin" : "Customers"}
//                             </td>
//                             <td>
//                               <button
//                                 style={{ cursor: "pointer", color: "white" }}
//                                 className="btn btn-danger"
//                                 onClick={() => handleDeleteUser(user.id)}
//                               >
//                                 Delete
//                               </button>
//                             </td>
//                           </tr>
//                         );
//                       })}
//                     </tbody>
//                   </table>
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
// import { addCategory, editCategory, getCategories } from "../../services/API/categoryApi"; // Adjust the import based on your actual API functions

export default function CategoriesAdmin() {

  const user = useSelector((state) => state.auth.login.currentUser);
  const dispatch = useDispatch();
  const [categoryName, setCategoryName] = useState("");
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    // Fetch categories when the component mounts
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      // Fetch categories from the API
      const response = await axios.get("http://localhost:5000/api/v1/products/catg");
       //console.log(response.data.categories)
      // Update the state with the fetched categories
     setCategories(response.data.categories);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const handleAddCategory = async () => {
    let name=categoryName
    try {
      // Send a POST request to create a new category
      const response = await axios.post(
        "http://localhost:5000/api/v1/products/catg/",  // Adjust the endpoint based on your API
        { name },{
          withCredentials:true
        }
      );

      // Handle the response as needed
     console.log("Category added successfully:", response.data);
      // Clear the input field after adding the category
      setCategoryName("");
      // Fetch categories after adding a new category
      fetchCategories();
    } catch (error) {
      // Handle any errors from the API request
      console.error("Error adding category:", error);
    }
  };

  const [showModal, setShowModal] = useState(false);
  const [editCategoryName, setEditCategoryName] = useState('');
  const [editCategoryId, setEditCategoryId] = useState(null);

  const handleShowModal = (categoryId, categoryName) => {
    setEditCategoryId(categoryId);
    setEditCategoryName(categoryName);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleEditCategory = async () => {
    try {
      // Send a PATCH request to update the category
      const response = await axios.patch(
        `http://localhost:5000/api/v1/products/catg/${editCategoryId}`,  // Adjust the endpoint based on your API
        { name: editCategoryName },
        {
          withCredentials: true,
        }
      );

      // Handle the response as needed
      console.log("Category edited successfully:", response.data);
      setEditCategoryId("");
      setEditCategoryName("");
      // Close the modal after editing
      handleCloseModal();

      // Fetch categories after editing
      fetchCategories();
    } catch (error) {
      // Handle any errors from the API request
      console.error("Error editing category:", error);
    }
  };

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
                  <label>Category Name:</label>
                  <input
                    type="text"
                    className="form-control"
                    value={categoryName}
                    onChange={(e) => setCategoryName(e.target.value)}
                  />
                </div>
                <button
                  className="btn btn-primary"
                  onClick={handleAddCategory}
                >
                  Add Category yomolopo
                </button>
                <br />
                <br />
                <div className="table-responsive">
        <table className="table table-striped table-bordered no-wrap">
          <thead>
            <tr>
              <th>ID</th>
              <th>Category Name</th>
              <th>Edit</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category) => (
              <tr key={category.id}>
                <td>{category.id}</td>
                <td>{category.name}</td>
                <td>
                  <button
                    style={{ cursor: "pointer", color: "white" }}
                    className="btn btn-info"
                    onClick={() => handleShowModal(category.id, category.name)}
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal for editing category */}
      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Edit Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <label>Category Name:</label>
          <input
            type="text"
            className="form-control"
            value={editCategoryName}
            onChange={(e) => setEditCategoryName(e.target.value)}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleEditCategory}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>  
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <footer className="footer text-center text-muted">
        All Rights Reserved by Adminmart. Designed and Developed by{" "}
        <a href="">MAKK</a>.
      </footer>
    </div>
  );
}