import React from 'react'
import styled from 'styled-components'
import {BsArrowLeft} from 'react-icons/bs'
import video from '../assets/video.mp4'
import { useNavigate } from 'react-router-dom'

const Player = () => {
    const navigate =useNavigate()
  return (
    <Container>
        <div className="player">
            <div className="back">
                <BsArrowLeft onClick={()=>navigate(-1)}/>
            </div>
            <video src={video} autoPlay loop controls muted></video>
        </div>
    </Container>
  )
}

export default Player

const Container = styled.div`
  .player {
    width: 100vw;
    height: 100vh;
    .back {
      position: absolute;
      padding: 2rem;
      z-index: 1;
      svg {
        font-size: 3rem;
        cursor: pointer;
      }
    }
    video {
      height: 100%;
      width: 100%;
      object-fit: cover;
    }
  }
  @media (max-width:900px) {
    .player {
    width: 100vw;
    height: 50vh;
    margin-top: 10rem;
    .back {
      position: absolute;
      padding: 2rem;
      z-index: 1;
      svg {
        font-size: 2rem;
        cursor: pointer;
      }
    }
    video {
      height: 50%;
      width: 150%;
      object-fit: cover;
      margin-top: 50%;
    }
  }
  }

`;