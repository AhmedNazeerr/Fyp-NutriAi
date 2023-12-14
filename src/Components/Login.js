import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import { Modal, Button } from "react-bootstrap";
import Navbar from "./Navbar";
import Footer from "./Footer"; // Import your Footer component
const LoginPage = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showCreateAccount, setShowCreateAccount] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [forgetemail,setForgetEmail]= useState("");
  
  const navigate = useNavigate();

  const handleLogin = () => {
    // Add your login logic here
    console.log("Email:", email);
    console.log("Password:", password);
  };

  const handleCreateAccountClick = () => {
    console.log(`Clicked on Create Account`);
    navigate(`/SignUp`);
  };
  const handleCreateWholesaleClick = () => {
    console.log(`Clicked on Create Wholesale Account`);
    navigate(`/CreateWholesale`);
  };

  const handleCloseCreateAccount = () => setShowCreateAccount(false);
  // const handleShowCreateAccount = () => setShowCreateAccount(true);
  // const handleCloseForgotPassword = () => setShowForgotPassword(false);
  const handleShowForgotPassword = () => setShowForgotPassword(true);

  return (
    <>
      <Navbar />

      <div className="parent-container">
        {!showForgotPassword ? (
          <div className="login-container">
            <h1>Login</h1>
            <p
              style={{
                marginLeft: "13%",
                marginBottom: "10%",
                fontSize: "16px",
                fontFamily: "Arvo",
              }}
            >
              Please enter your e-mail and password:
            </p>
            <form>
              <div className="input-group">
                <input
                  type="text"
                  placeholder="Email"
                  style={{ fontSize: "16px", fontFamily: "Arvo" }}
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="input-group">
                <input
                  type="password"
                  placeholder="Password"
                  style={{
                    marginBottom: "5%",
                    fontSize: "16px",
                    fontFamily: "Arvo",
                    textTransform:"none"
                  }}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <Button
                className="buttonLogin"
                style={{ marginBottom: "2.5%", fontFamily: "Bebas Neue" }}
                onClick={handleLogin}
              >
                Login
              </Button>
              <div className="buttonsCF">
                <Button
                  variant="link"
                  onClick={handleCreateAccountClick}
                  style={{ fontFamily: "Arvo" }}
                >
                  Create Account?
                </Button>
                <Button
                  variant="link"
                  onClick={handleShowForgotPassword}
                  style={{ fontFamily: "Arvo" }}
                >
                  Forgot Password?
                </Button>
              </div>

              <div className='WSaccount'>
          <Button className='WSaccountbtn' variant="link" onClick={handleCreateWholesaleClick} style={{textDecoration: 'none', color: 'gray', fontFamily: 'Arvo'}}>
                Create wholesale account 
          </Button>
          </div>
            </form>
          </div>
        ) : (
          <div className="login-container">
            <h1>Recover password</h1>
            <p
              style={{
                marginLeft: "15%",
                marginBottom: "7%",
                fontSize: "16px",
                fontFamily: "Arvo",
              }}
            >
              Please enter your e-mail:
            </p>
            <form>
              <div className="input-group">
                <input
                  type="text"
                  placeholder="Email"
                  style={{ fontSize: "16px", fontFamily: "Arvo" }}
                  id="email"
                  value={forgetemail}
                  onChange={(e) => setForgetEmail(e.target.value)}
                />
              </div>
              <Button
                className="buttonLogin"
                style={{ marginBottom: "2.5%", fontFamily: "Bebas Neue" }}
                // onClick={
                //   forgetemail=" "
                // }
              >
                RECOVER
              </Button>
              <div className="buttonsCF">
                <Button
                  variant="link"
                  onClick={handleCreateAccountClick}
                  style={{ fontFamily: "Arvo" }}
                >
                  Create Account?
                </Button>
                <Button
                  variant="link"
                  onClick={() => setShowForgotPassword((prev) => !prev)}
                  style={{ fontFamily: "Arvo" }}
                >
                  Back to Login.
                </Button>
              </div>
            </form>
          </div>
        )}

        {/* Create Account Modal */}
        <Modal show={showCreateAccount} onHide={handleCloseCreateAccount}>
          <Modal.Header closeButton>
            <Modal.Title>Create Account</Modal.Title>
          </Modal.Header>
          <Modal.Body>{/* Add your create account form here */}</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseCreateAccount}>
              Close
            </Button>
            <Button variant="primary" onClick={handleCloseCreateAccount}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>

        {/* Forgot Password Modal */}
        {/* <Modal show={showForgotPassword} onHide={handleCloseForgotPassword}>
          <Modal.Header closeButton>
            <Modal.Title>Forgot Password</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <input
              type="text"
              placeholder="Enter email"
              style={{ fontSize: "16px", fontFamily: "Bebas Neue" }}
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseForgotPassword}>
              Close
            </Button>
            <Button variant="primary" onClick={handleCloseForgotPassword}>
              Submit
            </Button>
          </Modal.Footer>
        </Modal> */}
      </div>
      <Footer />
    </>
  );
};

export default LoginPage;
