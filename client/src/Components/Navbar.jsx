import React, { useState } from 'react'
import { styled } from 'styled-components';
import logo from '../assets/logo.png'
import { Link, useNavigate } from 'react-router-dom';
import {FaPowerOff, FaSearch} from 'react-icons/fa'
import { firebaseAuth } from './../utils/firebase-config';
import { onAuthStateChanged, signOut } from 'firebase/auth';

const Navbar = ({isScrolled}) => {
    const links=[
        {name:"Home",link:"/"},
        {name:"TV Shows",link:"/tv"},
        {name:"Movies",link:"/movies"},
        {name:"My List",link:"/mylist"}
    ]

    const [showSearch,setShowSearch]=useState(false)
    const [inputHover,setInpuHover]=useState(false)

    const navigate=useNavigate()

    onAuthStateChanged(firebaseAuth, (currentUser) => {
        if (!currentUser) navigate("/login");
      });
  return (
    <Container>
        <nav className={`flex ${isScrolled?"scrolled":""} nav`}>
            <div className="left flex a-center ">
                 <div className="brand felx a-center j-center">
                    <img src={logo} alt="logo" />
                 </div>
                 <ul className="links flex">
                    {
                        links.map(({name,link})=>(
                            <li key={name}><Link to={link}>{name}</Link></li>
                        ))
                    }
                 </ul>
            </div>
            <div className="right flex a-center">
                <div className={`search ${showSearch?"show-search":""}`}>
                    <button className='src' onFocus={()=>setShowSearch(true)} onBlur={()=>{if (!inputHover) {setShowSearch(false)}}}><FaSearch/></button>
                    <input  type="text" placeholder='Search' id="" onMouseEnter={()=>setInpuHover(true)} onMouseLeave={()=>setInpuHover(false)} onBlur={()=>{
                        setShowSearch(false)
                        setInpuHover(false)
                    }}/>
                </div>
                <button className='signout' onClick={()=> signOut(firebaseAuth)}><FaPowerOff/></button>
            </div>
        </nav>
    </Container>
  )
}

export default Navbar

const Container = styled.div`
  .scrolled {
    background-color: black;
  }
  
`;