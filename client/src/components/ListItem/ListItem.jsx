import React, { useEffect, useRef, useState } from 'react'
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import AddIcon from '@mui/icons-material/Add';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import NetflixBaseURL from '../../apis/NetflixBaseURL';
import { useNavigate } from 'react-router-dom';


import './ListItem.css'

const ListItem = ({index,item}) => {
//don't forget this bloody bracket when passing props
    const [isHovered,setIsHovered] = useState(false);
    const [movie,setMovie] = useState({});

    const navigate = useNavigate();

    useEffect(() =>{
        const getMovie = async() => {
            try{
                const result = await NetflixBaseURL.get('/movies/find/'+item, {
                    headers:{
                        token: "Bearer "+JSON.parse(localStorage.getItem("user")).accessToken
                        //token: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjkiLCJpc2FkbWluIjp0cnVlLCJpYXQiOjE2OTg0NjgyNDEsImV4cCI6MTY5ODkwMDI0MX0.CC4357UDrTqr34j-FIKPUrBlbyqSQKVrzdLxL8m79j8"
                      }
                });
                //console.log(result.data.data.movie)
                setMovie(result.data.data.movie);
            }catch(err){
                console.log(err);
            }
        };
        getMovie()
    }, [item]);

    const handleNavigate = (e) => {
        e.stopPropagation()
        navigate(`/watch`,{state:{movie}});
    }

    const calcLeftPos = () => ({
        left: -40
    });
  return (
    <div className='card w-100 me-2 border border-0 rounded-0 position-relative' onClick={handleNavigate} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
        <div className="content" type="button"  style={calcLeftPos()}>
                    <img src={movie.imgsm} alt='' className='card-img-top img-fluid rounded-0'/> 
            {isHovered && (
                <>
                <div className="card-img-overlay position-absolute z-2 h-100 p-0">
                    <video src={movie.trailer} muted autoPlay={true} loop className='card-img-top top-0 left-0 w-100 position-absolute object-fit-cover rounded-0'/>
                </div>
                <div className="card-body d-flex text-white d-none">
                    <div className="d-flex my-2">
                        <PlayArrowIcon className='icon me-2 rounded-circle border border-white border-2'/>
                        <AddIcon className='icon me-2 rounded-circle border border-white border-2'/>
                        <ThumbUpOffAltIcon className='icon me-2 rounded-circle border border-white border-2'/>
                        <ThumbDownOffAltIcon className='icon me-2 rounded-circle border border-white border-2'/>
                    </div>
                    <div className="card-title fw-bold fs-6 text-white-50 align-items-center d-flex">
                        <div className="span">{movie.movielength}</div>
                        <div className="span border border-white mx-3 px-1">+{movie.agelimit}</div>
                        <div className="span">{movie.year}</div>
                    </div>
                    <div className="card-text fs-6 mb-2">
                        {movie.description}                        
                    </div>
                    <h5>
                    {movie.genre}
                    </h5>
                </div>
            </>
            )} 
        </div>
        

        
        
        {/* <img src='https://lehren.com/wp-content/uploads/2023/01/selfiee-movies-first-motion-poster.jpg' alt='' className='object-fit-cover'/> */}
    </div>
  )
}

export default ListItem