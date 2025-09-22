import React, { useEffect, useState } from 'react'
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import InfoIcon from '@mui/icons-material/Info';
import Info from '@mui/icons-material/Info';
import NetflixBaseURL from '../../apis/NetflixBaseURL';
import "./Featured.css";
import { useNavigate } from 'react-router-dom';

const Featured = ({type, setGenre}) => {
    const [movie,setMovie] = useState({});
    const navigate=useNavigate();
    const [buttonGenreName,setButtonGenreName] = useState();
    const handleNavigate = (e) => {
        e.stopPropagation()
        navigate(`/watch`,{state:{movie}});
    }
    useEffect(() => {
        const getRandomContent = async()=>{
            try{
                //let url = `/movies/find/105`;
                let url;
                if(type != null)
                {
                    url = `/movies/random?type=${type}`
                }
                else
                {
                    url = `/movies/random`
                }
                const results = await NetflixBaseURL.get(url, {
                    headers:{
                        token: "Bearer "+JSON.parse(localStorage.getItem("user")).accessToken
                      }
                });
                //console.log(results.data);
                setMovie(results.data);
            }catch(err){
                console.log(err);
            }
        };
        getRandomContent();
    }, [type]);
    console.log(type);
  return (
    <div className='position-relative vh-90 overflow-hidden'>
        {type && (
            <div className="btn-group ms-5 position-absolute top-15 w-15 z-1" role="group">
                <h2 className='me-3 text-white'>{type == 'movie' ? "Movies" : "Series"}</h2>
                <button id="btnGroupDrop1" type="button" className="btn btn-dark btn-lg rounded dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false" name="genre" >
                    {buttonGenreName == null ? "Genre" : buttonGenreName}
                </button>
                <ul className="dropdown-menu dropdown-menu-dark border border-white" aria-labelledby="btnGroupDrop1">
                <li><a className="dropdown-item" href="#" name="Adventure" onClick={e=>{setGenre(e.target.name); setButtonGenreName(e.target.name); console.log(buttonGenreName)}}>Adventure</a></li>
                <li><a className="dropdown-item" href="#" name="Action" onClick={e=>{setGenre(e.target.name); setButtonGenreName(e.target.name); console.log(buttonGenreName)}}>Action</a></li>
                <li><a className="dropdown-item" href="#" name="Comedy" onClick={e=>{setGenre(e.target.name); setButtonGenreName(e.target.name); console.log(buttonGenreName)}}>Comedy</a></li>
                <li><a className="dropdown-item" href="#" name="Crime" onClick={e=>{setGenre(e.target.name); setButtonGenreName(e.target.name); console.log(buttonGenreName)}}>Crime</a></li>
                <li><a className="dropdown-item" href="#" name="Fantasy" onClick={e=>{setGenre(e.target.name); setButtonGenreName(e.target.name); console.log(buttonGenreName)}}>Fantasy</a></li>
                <li><a className="dropdown-item" href="#" name="Historical" onClick={e=>{setGenre(e.target.name); setButtonGenreName(e.target.name); console.log(buttonGenreName)}}>Historical</a></li>
                <li><a className="dropdown-item" href="#" name="Horror" onClick={e=>{setGenre(e.target.name); setButtonGenreName(e.target.name); console.log(buttonGenreName)}}>Horror</a></li>
                <li><a className="dropdown-item" href="#" name="Sci-Fi" onClick={e=>{setGenre(e.target.name); setButtonGenreName(e.target.name); console.log(buttonGenreName)}}>Sci-fi</a></li>
                <li><a className="dropdown-item" href="#" name="Thriller" onClick={e=>{setGenre(e.target.name); setButtonGenreName(e.target.name); console.log(buttonGenreName)}}>Thriller</a></li>
                <li><a className="dropdown-item" href="#" name="Western" onClick={e=>{setGenre(e.target.name); setButtonGenreName(e.target.name); console.log(buttonGenreName)}}>Western</a></li>
                <li><a className="dropdown-item" href="#" name="Animation" onClick={e=>{setGenre(e.target.name); setButtonGenreName(e.target.name); console.log(buttonGenreName)}}>Animation</a></li>
                <li><a className="dropdown-item" href="#" name="Drama" onClick={e=>{setGenre(e.target.name); setButtonGenreName(e.target.name); console.log(buttonGenreName)}}>Drama</a></li>
                <li><a className="dropdown-item" href="#" name="Documentary" onClick={e=>{setGenre(e.target.name); setButtonGenreName(e.target.name); console.log(buttonGenreName)}}>Documentary</a></li>
                </ul>
            </div>
        )}
        
        <img src={movie.img} alt="" className='img-fluid h-100 featured w-100 position-absolute top-0'/>
        <div className="container m-5 position-absolute">
            <div className="row row-cols-1 vh-75 w-75">
                <div className="col-9 align-self-end">
                    <img src={movie.imgtitle} className='w-100' alt=""/>
                    <h5 className='text-white fw-bold'>
                        {movie.description}
                    </h5>
                    <button type="submit" className='btn btn-lg btn-light ps-3 pe-4 py-3 me-3' onClick={handleNavigate}><PlayArrowIcon/> Play</button>
                    <button type="submit" className='btn btn-lg btn-secondary ps-3 pe-4 py-3'><Info/> Info</button>
                </div>
            </div>
        </div>
        
        
    </div>
  )
}

export default Featured