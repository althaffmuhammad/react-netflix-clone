import React, { useRef, useState } from 'react'
import Card from './Card';
import styled from 'styled-components';
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai';


const CardSlider = ({data,title}) => {
  const[showControlls,setShowControlls]=useState(false)

  const listRef=useRef()

 
  return (
    <Container className='flex column' onMouseEnter={()=>setShowControlls(true)} onMouseLeave={()=>setShowControlls(false)}>
      <h1>{title}</h1>
      <div className="wrapper">
        {/* <div className={`slider-action left ${!showControlls?"none":''} flex j-center a-center`}>
          <AiOutlineLeft />
        </div> */}
        <div className='slider flex' ref={listRef}>
        {data.map((movie,index)=>(
          <Card movieData={movie} index={index} key={movie.id}/>
        ))}
      </div>
      {/* <div className={`slider-action right ${!showControlls?"none":''} flex j-center a-center`}>
          <AiOutlineRight />
        </div> */}
      </div>
    </Container>

  )
}

export default CardSlider

const Container = styled.div`
  gap: 1rem;
  position: relative;
  padding: 2rem 0;
  h1 {
    margin-left: 50px;
  }
  .wrapper {
    overflow-y: hidden;
    overflow-x: scroll;
    &::-webkit-scrollbar{
    display: none;
  }
    .slider {
      width: max-content;
      gap: 1rem;
      transform: translateX(0px);
      transition: 0.3s ease-in-out;
      display: flex;
      margin-left: 50px;
    }
    .slider-action {
      position: absolute;
      z-index: 99;
      height: 100%;
      top: 0;
      bottom: 0;
      width: 50px;
      transition: 0.3s ease-in-out;
      svg {
        font-size: 2rem;
      }
    }
    .none {
      display: none;
    }
    .left {
      left: 0;
    }
    .right {
      right: 0;
    }
  }
  @media (max-width:900px) {
  gap: .5rem;
  position: relative;
  padding: 1rem 0;
  h1 {
    margin-left: 10px;
    font-size: 25px;
  }
  .wrapper {
    .slider {
      width: max-content;
      gap: .5rem;
      transform: translateX(0px);
      transition: 0.3s ease-in-out;
      display: flex;
      margin-left: 10px;
    }
    .slider-action {
      position: absolute;
      z-index: 99;
      height: 100%;
      top: 0;
      bottom: 0;
      width: 40px;
      transition: 0.3s ease-in-out;
      svg {
        font-size: 1.5rem;
      }
    }
    .none {
      display: none;
    }
    .left {
      left: 0;
    }
    .right {
      right: 0;
    }
  }
  }
`;