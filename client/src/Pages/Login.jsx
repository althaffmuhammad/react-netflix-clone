import React, { useState } from 'react'
import styled from 'styled-components'
import BackgraoundImage from '../Components/BackgraoundImage'
import Header from '../Components/Header'
import { firebaseAuth } from './../utils/firebase-config';
import { onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import './Login.css'

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin=async()=>{
      try {
          await signInWithEmailAndPassword(firebaseAuth,email,password)
      } catch (error) {
          console.log(error);
          
      }
  }
  onAuthStateChanged(firebaseAuth, (currentUser) => {
      if (currentUser) navigate("/");
    });
  return (
    <Container >
    <BackgraoundImage/>
    <div className="login-content">
        <Header signup/>
        <div className="form-container flex column a-center j-center">
          <div className="login-form flex column a-center j-center">
            <div className="title">
              <h3>Login</h3>
            </div>
            <div className="login-container flex column">
              <input
                type="text"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
              <input
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
              <button onClick={handleLogin}>Login to your account</button>
            </div>
          </div>
        </div>
    </div>
</Container>
  )
}

export default Login

const Container = styled.div`
  position: relative; 
`;