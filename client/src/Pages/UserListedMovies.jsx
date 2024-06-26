import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { onAuthStateChanged } from 'firebase/auth'
import { firebaseAuth } from '../utils/firebase-config'
import styled from 'styled-components'
import Navbar from '../Components/Navbar'
import Card from '../Components/Card'
import { getUserLikesMovies } from './../store/index';

const UserListedMovies = () => {
  const [isScrolled,setIsScrolled]=useState(false)
  //eslint-disable-next-line
  const genresLoaded=useSelector((state)=>state.netflix.genresLoaded)
  const [email, setEmail] = useState(undefined);
  const movies=useSelector((state)=>state.netflix.movies)
  const navigate = useNavigate();
  const dispatch =useDispatch()

  onAuthStateChanged(firebaseAuth, (currentUser) => {
    if (currentUser) setEmail(currentUser.email);
    else navigate("/login");
  });

  

  useEffect(() => {
    if (email) {
      dispatch(getUserLikesMovies(email));
    }//eslint-disable-next-line
  }, [email]);

  window.onscroll=()=>{
    setIsScrolled(window.pageYOffset===0? false:true)
    return ()=> (window.onscroll=null)
  }

  return (
    <Container>
       <Navbar isScrolled={isScrolled} />
      <div className="content flex column">
        <h1>My List</h1>
        <div className="grid flex">
          {movies.map((movie, index) => {
            return (
              <Card
                movieData={movie}
                index={index}
                key={movie.id}
                isLiked={true}
              />
            );
          })}
        </div>
      </div>
    </Container>
  )
}

export default UserListedMovies

const Container = styled.div`
  .content {
    margin: 2.3rem;
    margin-top: 8rem;
    gap: 3rem;
    h1 {
      margin-left: 3rem;
    }
    .grid {
      flex-wrap: wrap;
      gap: 1rem;
    }
  }
`;