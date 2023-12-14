import React, { useState } from "react";
import "./CustomInput.css";

const CustomInput = ({ label, inputType }) => {
  const [focused, setFocused] = useState(false);
  const [value, setValue] = useState("");
  const [error, setError] = useState("");

  const handleFocus = () => {
    setFocused(true);
    setError("");
  };

  const handleBlur = () => {
    if (inputType === "email") {
      validateEmail(value);
    } else if (inputType === "text") {
      validateText(value);
    } else if (inputType === "number") {
      validateNumber(value);
    }
  };

  const validateEmail = (email) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    if (!emailRegex.test(email)) {
      setError("Invalid email address");
    }
  };

  const validateText = (text) => {
    // Implement your text validation logic here
    if (text.length < 3) {
      setError("Text must be at least 3 characters long");
    } else {
      setError("");
    }
  };

  const validateNumber = (number) => {
    // Implement your number validation logic here
    if (isNaN(number)) {
      setError("Please enter a valid number");
    } else {
      setError("");
    }
  };

  const handleChange = (e) => {
    setValue(e.target.value);
    setError("");
  };

  const inputClass = error ? "invalid" : focused ? "focused" : "";

  // console.log("inputClass=>", inputClass);
  return (
    <div

      className={`input-container ${
        // eslint-disable-next-line
        inputClass == "invalid" ? "focused invalid" : "focused"
      }`}
    >
      <input
        type={inputType}
        value={value}
        placeholder={label}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChange={handleChange}
      />
      <label>{label}</label>
      {error && <div className="error-message">{error}</div>}
    </div>
  );
};

export default CustomInput;
