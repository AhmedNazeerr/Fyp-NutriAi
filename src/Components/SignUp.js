import React, { useState } from 'react';
import './SignUp.css';
import { Button } from 'react-bootstrap';
import Navbar from "./Navbar";
import Footer from "./Footer"; // Import your Footer component
import {useNavigate} from "react-router-dom";

const LoginPage = () => {
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();


  const handleSignUp = () => {
    // Add your login logic here
    console.log('Email:', email);
    console.log('Password:', password);
  };

  const handleLogin= () => {
    console.log(`Clicked on Create Account`);
    navigate(`/Login`);
  };

  return (
    <>
        <Navbar/>
    
    <div className="parentSU-container">
    
      <div className="SignUp-container">
        <h1>Register</h1>
        <p style={{marginLeft:'20%',marginBottom:'10%', fontSize: '16px', fontFamily: 'Arvo'}}>Please fill in the fields below:</p>
        <form>
        <div className="input-group">
            <input
              type="text"
              placeholder='First Name'
              style={{fontSize: '16px', fontFamily: 'Arvo'}}
              id="firstname"
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)} 
            />
          </div>
          <div className="input-group">
            <input
              type="text"
              placeholder='Last Name' 
              style={{fontSize: '16px', fontFamily: 'Arvo'}}
              id="lastname"
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
            />
          </div>
          <div className="input-group">
            <input
              type="text"
              placeholder='Email'
              style={{fontSize: '16px', fontFamily: 'Arvo'}}
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)} 
            />
          </div>
          <div className="input-group">
            <input
              type="password"
              placeholder='Password' 
              style={{marginBottom:'5%', fontSize: '16px', fontFamily: 'Arvo'}}
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <Button className='buttonSU' style={{marginBottom:'2.5%',fontFamily: 'Bebas Neue'}} onClick={handleSignUp}>SignUp</Button>
          <div className='buttonsAlreadyAcc'>
          <label className='already-acc'>Already have an account?</label>
          <Button variant="link" onClick={handleLogin} style={{fontFamily: 'Arvo'}}>
                Login
          </Button>
          </div>
        </form>
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default LoginPage;
