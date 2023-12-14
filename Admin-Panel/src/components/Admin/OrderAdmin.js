import React, { useState, useEffect } from "react";
import axios from "axios"; // Import Axios library

const OrderAdmin = () => {
  const [text, setText] = useState("");
  const [orders, setOrders] = useState([]); // State to store all orders

  useEffect(() => {
    // Fetch all orders when the component mounts
    fetchAllOrders();
  }, []);

  const fetchAllOrders = async () => {
    try {
      // Make a GET request to fetch all orders
      const response = await axios.get("http://localhost:5000/api/v1/order", {
        withCredentials: true,
      });
      console.log(response.data);
      // Update the state with the fetched orders
      setOrders(response.data.orders);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  const handleDelete = async (orderId) => {
    try {
      // Make a DELETE request to delete the order
      await axios.delete(`http://localhost:5000/api/v1/order/${orderId}`, {
        withCredentials: true,
      });

      // After successful deletion, fetch the updated list of orders
      fetchAllOrders();
    } catch (error) {
      console.error("Error deleting order:", error);
    }
  };

  return (
    <div className="page-wrapper">
      <div className="order-details">
        <h2>Order Details</h2>
        <h3>{text}</h3>
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
                <th>ID User</th>
                <th>Email</th>
                <th>Phone Number</th>
                <th>Address</th>
                <th>Total</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {/* Map through all orders and render each row */}
              {orders.map((orderItem) => (
                <tr key={orderItem.id}>
                  <td>{orderItem.id}</td>
                  <td>{orderItem.email}</td>
                  <td>{orderItem.phoneNumber}</td>
                  <td>{orderItem.address}</td>
                  <td>{orderItem.Total}</td>
                  <td>{orderItem.Status}</td>
                  <td>
                    <button
                      style={{ cursor: "pointer", color: "white" }}
                      className="btn btn-danger"
                      onClick={() => handleDelete(orderItem.id)}
                    >
                      Delete
                    </button>
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

export default OrderAdmin;