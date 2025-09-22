import React, { useContext, useState } from 'react'
import logo from './DupeFlix.png';
import profilePicture from './Netflix-avatar.png';
import SearchIcon from '@mui/icons-material/Search';
import NotificationsIcon from '@mui/icons-material/Notifications';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { useNavigate } from "react-router-dom";
import { Container } from '@mui/material';
import "./header.css";
import { AuthContext } from '../../authContext/AuthContext';
import { logout } from '../../authContext/AuthActions';

const Header = () => {

    let navigate=useNavigate();
    const [isScrolled, setIsScrolled] = useState(false);
    const {dispatch} = useContext(AuthContext);
    const handleNavigate = (e, page) => {
        e.stopPropagation()
        navigate(`/${page}`);
    }

    window.onscroll = () => {
        setIsScrolled(window.scrollY === 0 ? false : true);
        return null;
    }

  return (
    <div className={"container-fluid p-2 position-fixed sticky-top z-2 " + (isScrolled ? 'header scrolled' : 'header') }>
        <div className="row m-4 text-white d-flex align-items-center">
            <div className="col-1 p-3">
                    <img src={ logo } className="img-fluid" alt="placeholder"/>
            </div>
            <div className="col-5">
                <div className="btn-group-lg" role="group" aria-label="Basic example">
                    <button type="button" className="btn btn-secondary-outline text-white" onClick={(e) => handleNavigate(e,'')}>HomePage</button>
                    {/* in the video he links it like this, this classname='link is to prevent the purple text which tells you that you clicked already
                        Could be useful in the future
                        <Link to='/series' classname='link'>
                            <span>Series</span>
                        </Link>
                        then he goes into app.css and affects it globally, go to app.css to look at it
                    */}
                    <button type="button" className="btn btn-secondary-outline text-white" onClick={(e) => handleNavigate(e,'series')}>Series</button>
                    <button type="button" className="btn btn-secondary-outline text-white" onClick={(e) => handleNavigate(e,'movies')}>Movies</button>
                    <button type="button" className="btn btn-secondary-outline text-white">New and Popular</button>
                    <button type="button" className="btn btn-secondary-outline text-white">My List</button>
                </div>
            </div>
            <div className="col-2 offset-4">
                <div className="btn-group-lg" role="group" aria-label="Basic example">
                    <button type="button" className="btn outline-0 text-white shadow-none"><SearchIcon/></button>
                    <button type="button" className="btn btn-secondary-outline text-white">Kids</button>
                    <button type="button" className="img-size btn text-white">
                        <img src={profilePicture} className='img-fluid rounded'/>
                    </button>
                    <div className="btn-group" role="group">
                        <button id="btnGroupDrop1" type="button" className="btn text-white" data-bs-toggle="dropdown" aria-expanded="false">
                            <ArrowDropDownIcon/>
                        </button>
                        <ul className="dropdown-menu dropdown-menu-dark" aria-labelledby="btnGroupDrop1">
                        <li><a className="dropdown-item" href="#">Settings</a></li>
                        <li><a className="dropdown-item" href="#" onClick={()=>dispatch(logout())}>Logout</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
  </div>
    
    
  )
}

export default Header