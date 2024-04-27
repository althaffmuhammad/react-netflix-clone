import {Route,Routes} from 'react-router-dom'
import Login from './Pages/Login';
import Netflix from './Pages/Netflix';
import Signup from './Pages/Signup';
import Player from './Pages/Player';
import Movies from './Pages/Movies';
import TvShows from './Pages/TvShows';
import UserListedMovies from './Pages/UserListedMovies';
function App () {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Netflix/>}/>
        <Route path='/player' element={<Player/>}/>
        <Route path='/movies' element={<Movies/>}/>
        <Route path='/mylist' element={<UserListedMovies/>}/>
        <Route path='/tv' element={<TvShows/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<Signup/>}/>
      </Routes>
    </div>
  );
}

export default App;
