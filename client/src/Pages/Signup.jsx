import React, { useState } from 'react'
import styled from 'styled-components'
import BackgraoundImage from '../Components/BackgraoundImage'
import Header from '../Components/Header'
import { firebaseAuth } from './../utils/firebase-config';
import { createUserWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import './Signup.css'

const Signup = () => {
    const navigate =useNavigate()
    const [showPassword, setShowPassword] = useState(false);
    const [formValues, setFormValues] = useState({
        email:"",
        password:"",
    });

    const handleSignUp=async()=>{
        try {
            const {email,password}=formValues
            await createUserWithEmailAndPassword(firebaseAuth,email,password)
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
        <div className="signup-content">
            <Header login/>
            <div className="body flex column a-center j-center">
                <div className="text felx column txt">
                     <h1>Unlimited movies, TV shows and more.</h1>
                     <h4>Watch anywhere. Cancel anytime.</h4>
                     <h6>
                       Ready to watch? Enter your email to create or restart membership.
                     </h6>
                </div>
                <div className="form signup-form">
                    <input type="email" name="email" placeholder='Emain Address' value={formValues.email} onChange={(e)=>setFormValues({...formValues,[e.target.name]:e.target.value,})}/>
                    {showPassword && (
                        <input className='password' type="password" name="password" placeholder='Password'  value={formValues.password} onChange={(e)=>setFormValues({...formValues,[e.target.name]:e.target.value,})}/>
                    ) }
                    {!showPassword && (
                        <button onClick={() => setShowPassword(true)}>Get Started</button>
                    )}
                </div>
                <button onClick={handleSignUp}>Sign Up</button>
            </div>
        </div>
    </Container>
  )
}

export default Signup

const Container = styled.div`
  position: relative;
  .signup-form {
    display: grid;
    grid-template-columns: ${({ showPassword }) =>
      showPassword ? "1fr 1fr" : "2fr 1fr"};
    width: 60%;
}
@media (max-width: 900px) {
  .signup-form {
    grid-template-columns: 1fr; /* Change to single column layout */
    width: 80%; /* Adjust width as needed */;
}
}
`;