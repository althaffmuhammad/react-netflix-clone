import React, { useEffect, useState } from 'react'
import Navbar from '../Components/Navbar'
import { FaPlay } from 'react-icons/fa'
import { AiOutlineInfoCircle } from 'react-icons/ai'
import backgroundImage from '../assets/hero_banner.jpg'
import MovieLogo from '../assets/hero_title.png'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchMovies, getGenres } from '../store'
import Slider from '../Components/Slider'

const Netflix = () => {
  const [isScrolled,setIsScrolled]=useState(false)
  const navigate=useNavigate()
  const genresLoaded=useSelector((state)=>state.netflix.genresLoaded)
  const movies=useSelector((state)=>state.netflix.movies)
  const dispatch =useDispatch()

  useEffect(()=>{
    dispatch(getGenres())
    //eslint-disable-next-line
  },[])

  useEffect(()=>{
    if (genresLoaded) {
      dispatch(fetchMovies({type:"all"}))
    }
    //eslint-disable-next-line
  },[genresLoaded])

  window.onscroll=()=>{
    setIsScrolled(window.pageYOffset===0? false:true)
    return ()=> (window.onscroll=null)
  }



  return (
    <Container>
      <Navbar isScrolled={isScrolled}/>
      <div className="hero">
        <img
          src={backgroundImage}
          alt="background"
          className="background-image"
        />
        <div className="container">
          <div className="logo">
            <img src={MovieLogo} alt="Movie Logo" />
          </div>
          <div className="buttons flex">
            <button
              onClick={() => navigate("/player")}
              className="flex j-center a-center"
            >
              <FaPlay />
              Play
            </button>
            <button className="flex j-center a-center">
              <AiOutlineInfoCircle />
              More Info
            </button>
          </div>
        </div>
      </div>
      <Slider movies={movies}/>
    </Container>
  )
}

export default Netflix

const Container = styled.div`
  background-color: black;
  .hero {
    position: relative;
    .background-image {
      filter: brightness(80%);
    }
    img {
      height: 100vh;
      width: 100vw;
    }
    .container {
      position: absolute;
      bottom: 5rem;
      .logo {
        img {
          width: 80%;
          height: 100%;
          margin-left: 5rem;
        }
      }
      .buttons {
        margin: 5rem;
        gap: 2rem;
        button {
          font-size: 1.4rem;
          gap: 1rem;
          border-radius: 0.2rem;
          padding: 0.5rem;
          padding-left: 2rem;
          padding-right: 2.4rem;
          border: none;
          cursor: pointer;
          transition: 0.2s ease-in-out;
          &:hover {
            opacity: 0.8;
          }
          &:nth-of-type(2) {
            background-color: rgba(109, 109, 110, 0.7);
            color: white;
            svg {
              font-size: 1.8rem;
            }
          }
        }
      }
    }
  }
  @media (max-width:900px) {
    .hero {
    position: relative;
    .background-image {
      filter: brightness(80%);
    }
    img {
      height: 60vh;
      width: 100vw;
    }
    .container {
      position: absolute;
      bottom: 4rem;
      .logo {
        img {
          width: 60%;
          height: 100%;
          margin-left: 2rem;
        }
      }
      .buttons {
        margin: 2rem;
        gap: .5rem;
        button {
          font-size: 1rem;
          gap: .5rem;
          border-radius: 0.2rem;
          padding: 0.5rem;
          padding-left: 1rem;
          padding-right: 1.4rem;
          border: none;
          cursor: pointer;
          transition: 0.2s ease-in-out;
          &:hover {
            opacity: 0.8;
          }
          &:nth-of-type(2) {
            background-color: rgba(109, 109, 110, 0.7);
            color: white;
            svg {
              font-size: 1rem;
            }
          }
        }
      }
    }
  }
  }
`;