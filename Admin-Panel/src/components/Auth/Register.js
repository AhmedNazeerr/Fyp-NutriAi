import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./Auth.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { registerUser } from "../../services/API/authApi";

export default function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      fullname: "",
      email: "",
      password: "",
      phone: "",
    },
    validationSchema: Yup.object().shape({
      fullname: Yup.string().required("(*) Full name is not empty"),
      email: Yup.string()
    .required("(*) Email is not empty")
    .matches(
      /^[a-zA-Z][a-zA-Z0-9._-]*@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
      "Email is invalid (first 2 characters should not be numerical or special characters)"
    ),
      password: Yup.string()
        .required("(*) Password is not empty")
        .min(6, "Must be 6-32 letters")
        .max(32, "Must be 6-32 letters"),
        phone: Yup.string()
        .required("(*) Phone is not empty")
        .matches(/^[0-9]{11}$/, {
          message: "Number phone is invalid (should contain only digits)",
          excludeEmptyString: true,
        }),
    
    }),
    onSubmit: async (values) => {
      try {
        // Call the registerUser function to register the user
        await registerUser(dispatch, values);
    
        // After successful registration, navigate to the login page
        navigate('/login');
      } catch (error) {
        // Handle any errors during registration
        console.error('Registration error:', error);
      }
    },
    
  });

  return (
    <div className="limiter">
      <div className="container-login100">
        <form onSubmit={formik.handleSubmit}>
          <div className="wrap-login100">
            <span className="login100-form-title mt-5">Register</span>
            <div className="d-flex justify-content-center pb-5"></div>
            <div className="wrap-input100">
              <input
                name="fullname"
                className="input100"
                type="text"
                placeholder="Full Name"
                onChange={formik.handleChange}
              />
              {formik.errors.fullname && formik.touched.fullname ? (
                <div className="text-danger">{formik.errors.fullname}</div>
              ) : null}
            </div>

            <div className="wrap-input100">
              <input
                className="input100"
                type="text"
                placeholder="Email"
                name="email"
                onChange={formik.handleChange}
              />
              {formik.errors.email && formik.touched.email ? (
                <div className="text-danger">{formik.errors.email}</div>
              ) : null}
            </div>

            <div className="wrap-input100">
              <input
                className="input100"
                type="password"
                placeholder="Password"
                name="password"
                onChange={formik.handleChange}
              />
              {formik.errors.password && formik.touched.password ? (
                <div className="text-danger">{formik.errors.password}</div>
              ) : null}
            </div>

            <div className="wrap-input100">
              <input
                className="input100"
                type="text"
                placeholder="Phone"
                name="phone"
                onChange={formik.handleChange}
              />
              {formik.errors.phone && formik.touched.phone ? (
                <div className="text-danger">{formik.errors.phone}</div>
              ) : null}
            </div>

            <button className="login100-form-btn">Register</button>

            <div className="text-center py-4">
              <span className="txt1">Login?</span>
              &nbsp;
              <NavLink to="/signin" className="txt2">
                Click
              </NavLink>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
