import React from 'react'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useLocation, useNavigate } from 'react-router-dom';

const Watch = () => {
  const location = useLocation();
  const navigate = useNavigate();
  //why do we pass in state movie here, can we comment it out?
  const handleNavigate = (e) => {
    e.stopPropagation()
    navigate(`/`,{state:{movie}});
  } 
  const movie = location.state.movie;
  console.log(location);
  return (
    //the reaspm why vh-100 is overflow is becaues our button takes up a tiny bit of space, and is therefore causing some overflow
    //Might be able to fix this some way
    <div className='vw-100 vh-100 overflow-hidden'>
        <button type="button" onClick={handleNavigate} className="btn z-1 btn-secondary-outline d-flex align-items-center position-absolute text-white">
            <ArrowBackIcon/>
            Home
        </button>
        <video autoPlay progress="true" controls src={movie.video} className='w-100 h-100 object-fit-cover'/>
     </div>
  )
}

export default Watch