import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { fetchMovies, getGenres } from '../store'
import { onAuthStateChanged } from 'firebase/auth'
import { firebaseAuth } from '../utils/firebase-config'
import styled from 'styled-components'
import Navbar from '../Components/Navbar'
import Slider from '../Components/Slider'
import NotAvailable from './../Components/NotAvailable';
import SelectGenre from '../Components/SelectGenre'

const TvShows = () => {
    const [isScrolled,setIsScrolled]=useState(false)
  const navigate=useNavigate()
  const genresLoaded=useSelector((state)=>state.netflix.genresLoaded)
  const movies=useSelector((state)=>state.netflix.movies)
  const genres = useSelector((state) => state.netflix.genres);
  const dispatch =useDispatch()
  //eslint-disable-next-line
  const [user, setUser] = useState(undefined);

  useEffect(()=>{
    dispatch(getGenres())
    //eslint-disable-next-line
  },[])

  useEffect(()=>{
    if (genresLoaded) {
      dispatch(fetchMovies({type:"tv"}))
    }//eslint-disable-next-line
  },[genresLoaded])

  window.onscroll=()=>{
    setIsScrolled(window.pageYOffset===0? false:true)
    return ()=> (window.onscroll=null)
  }

  onAuthStateChanged(firebaseAuth, (currentUser) => {
    if (currentUser) setUser(currentUser.uid);
    else navigate("/login");
  });
  return (
    <Container>
        <div className="navbar">
            <Navbar isScrolled={isScrolled}/>
        </div>
        <div className="data">
        <SelectGenre genres={genres} type="tv" />
        {movies.length ? <Slider movies={movies} /> : <NotAvailable />}
        </div>
    </Container>
  )
}

export default TvShows

const Container = styled.div`
  .data {
    margin-top: 8rem;
    .not-available {
      text-align: center;
      color: white;
      margin-top: 4rem;
    }
  }
`;