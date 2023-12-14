import React, { useState, useEffect } from "react";
import axios from "axios";

const CustomerAdmin = () => {
  // Define the state to hold the JSON data
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    // Fetch all customers when the component mounts
    fetchAllCustomers();
  }, []);

  const fetchAllCustomers = async () => {
    try {
      // Make a GET request to fetch all customers
      const response = await axios.get("http://localhost:5000/api/v1/user?role=user", {
        withCredentials: true,
      });
console.log(response.data)
      // Update the state with the fetched customer data
      setUserData(response.data);
    } catch (error) {
      console.error("Error fetching customers:", error);
    }
  };

  // Log to console to check if the component renders with the correct state
  console.log("Rendering CustomerAdmin with userData:", userData);

  return (
    <div className="page-wrapper">
      <div className="order-details">
        <h2>User Details</h2>
        <input
          className="form-control w-25"
          type="text"
          placeholder="Enter Search!"
        />
        <br />
        <div className="table-responsive">
          <table className="table table-striped table-bordered no-wrap">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Password</th>
                <th>Activation Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {/* Map through all customers and render each row */}
              {userData.map((customer) => (
                <tr key={customer.id}>
                  <td>{customer.id}</td>
                  <td>{customer.name}</td>
                  <td>{customer.email}</td>
                  <td>{customer.password}</td>
                  <td>{customer.activation_status ? "Active" : "Inactive"}</td>
                  <td>
                    {/* Add your action buttons or links here */}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <footer className="footer text-center text-muted">
        All Rights Reserved by Adminmart. Designed and Developed by{" "}
        <a href="">MAKK</a>.
      </footer>
    </div>
  );
};

export default CustomerAdmin;
