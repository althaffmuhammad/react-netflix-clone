import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import {IoPlayCircleSharp} from 'react-icons/io5'
import {RiThumbUpFill,RiThumbDownFill} from 'react-icons/ri'
import {BsCheck} from 'react-icons/bs'
import {AiOutlinePlus} from 'react-icons/ai'
import {BiChevronDown} from 'react-icons/bi'
import { firebaseAuth } from '../utils/firebase-config'
import { onAuthStateChanged } from 'firebase/auth'
import  axios  from 'axios';
import { useDispatch } from 'react-redux';
import { removeMovieFromLiked } from '../store'


const Card = ({movieData,isLiked=false}) => {
  const navigate =useNavigate()
  const [email, setEmail]=useState(undefined)
  const [isHovered,setIsHovered]=useState(false)

  const dispatch =useDispatch()


  onAuthStateChanged(firebaseAuth, (currentUser) => {
    if (currentUser) setEmail(currentUser.email);
    else navigate("/login")
  });

  const addToList= async ()=>{
    try {
      await axios.post("https://react-netflix-clone-7w1z.onrender.com/api/user/add",{email,data:movieData})
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <Container onMouseEnter={()=>setIsHovered(true)} onMouseLeave={()=>setIsHovered(false)}>
      <img src={`https://image.tmdb.org/t/p/w500${movieData.image}`} alt="movies" />
      {
        isHovered && (
          <div className="hover">
              <div className="info-container flex column">
                <h3 className='name' onClick={()=>navigate("/player")}>{movieData.name}</h3>
                <div className="icons flex j-center">
                  <div className="controls">
                    <IoPlayCircleSharp title='Play' onClick={()=>navigate("/player")}/>
                    <RiThumbUpFill title='Like'/>
                    <RiThumbDownFill title='Dislike'/>
                    {isLiked?(
                      <BsCheck title='Remove From List'onClick={()=>dispatch(removeMovieFromLiked({movieId:movieData.id,email}))}/>
                    ):(
                      <AiOutlinePlus title='Add To My List' onClick={addToList}/>
                    )}
                  </div>
                  <div className="info">
                    <BiChevronDown title='More Info'/>
                  </div>
                </div>
                <div className="genres flex">
                  <li key={movieData.genres}>{movieData.genres[1]}</li>
                </div>
              </div>
          </div>
        )
      }
    </Container>
  )
}

export default Card

const Container = styled.div`
  max-width: 230px;
  width: 230px;
  height: 100%;
  cursor: pointer;
  position: relative;
  img {
    border-radius: 0.2rem;
    width: 100%;
    height: 100%;
    z-index: 10;
  }
  .hover {
    z-index: 99;
    height:100%;
    width: 230px;
    position: absolute;
    top: 0;
    left: 0;
    /* border-radius: 0.3rem; */
    box-shadow: rgba(0, 0, 0, 0.75) 0px 3px 10px;
    background-color: #181818;
    transition: 0.3s ease-in-out;

    .info-container {
      padding: 1rem;
      gap: 0.5rem;
    }
    .icons {
      .controls {
        display: flex;
        gap: 1rem;
      }
      svg {
        font-size: 2rem;
        cursor: pointer;
        transition: 0.3s ease-in-out;
        &:hover {
          color: #b8b8b8;
        }
      }
    }
    .genres {
      display: none;
    }
  }
  @media (max-width:900px) {
    max-width: 230px;
  width: 150px;
  height: 100%;
  cursor: pointer;
  position: relative;
  img {
    border-radius: 0.2rem;
    width: 100%;
    height: 100%;
    z-index: 10;
  }
  .hover {
    z-index: 99;
    height: max-content;
    width: 150px;
    position: absolute;
    top: 0;
    left: 0;
    border-radius: 0.3rem;
    box-shadow: rgba(0, 0, 0, 0.75) 0px 3px 10px;
    background-color: #181818;
    transition: 0.3s ease-in-out;

    .info-container {
      padding: 1rem;
      gap: 0.5rem;
    }
    .icons {
      .controls {
        display: flex;
        gap: 0rem;
        display: none;
      }
      svg {
        font-size: 2px;
        cursor: pointer;
        transition: 0.3s ease-in-out;
        &:hover {
          color: #b8b8b8;
        }
      }
    }
    .genres {
      ul {
        gap: 1rem;
        li {
          padding-right: 0.7rem;
          &:first-of-type {
            list-style-type: none;
          }
        }
      }
    }
  }  
  }

`;