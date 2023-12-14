import React, { useState,useEffect } from "react";
import { useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { loginUser } from "../../services/API/authApi";
import "./Auth.css";
import {
  loginFailed,
  loginStart,
  loginSuccess,
  logoutUserFailed,
  logoutUserStart,
  logoutUserSuccess,
  registerFailed,
  registerStart,
  registerSuccess,
} from "../../redux/authSlice";
import axios  from "axios";
export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    const storedUserInfo = localStorage.getItem("userInfo");
    if (storedUserInfo) {
      // Redirect to the desired page
      window.location.href = "/admin";
    }
  }, []);
  const handleLogin = async() => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/v1/auth/login",{
          email,password
      },
        { withCredentials: true }
      );

      // Extract user information from the response
      const userInfo = response.data.user;
console.log(userInfo)
      // Store user information in local storage
      localStorage.setItem("userInfo", JSON.stringify(userInfo));

      // Dispatch your login action or perform other actions as needed
      dispatch(loginSuccess(response.data));
      window.location.href = "/admin";
    } catch (error) {
      // Handle login error
      console.error("Login failed", error);
    }
  };
  return (
    <div className="limiter">
      <div className="container-login100">
        <div className="wrap-login100">
          <span className="login100-form-title mt-5">Login</span>
          <div className="d-flex justify-content-center pb-5"></div>

          <div className="wrap-input100">
            <input
              className="input100"
              type="text"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="wrap-input100">
            <input
              className="input100"
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button className="login100-form-btn" onClick={handleLogin}>
            Login
          </button>

          <div className="text-center py-4">
            <span className="txt1">Create an account?</span>
            &nbsp;
            <NavLink to="/register" className="txt2">
              Click
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
}
