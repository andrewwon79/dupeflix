import React, { useRef, useState } from 'react'
import logo from '../../components/header/DupeFlix.png';
import "./Register.css";
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import NetflixBaseURL from '../../apis/NetflixBaseURL';

const Register = () => {

    const[email,setEmail] = useState("");
    const[password,setPassword] = useState("");
    const [username,setUsername] = useState("");
    const navigate = useNavigate();

    const emailRef = useRef();
    const passwordRef = useRef();
    const usernameRef = useRef();

    const handleStart = async () => {
        setEmail(emailRef.current.value);
    }
    const handleFinish = async (e) => {
        e.preventDefault();
        setPassword(passwordRef.current.value);
        setUsername(usernameRef.current.value);
        try{
            await NetflixBaseURL.post("/auth/register", {email,username,password});
            navigate(`/login`);
        }catch(err){
            console.log(err);
        }
    }


  return (
    <div className='Register position-relative vw-100 vh-100 overflow-hidden'>
        <nav className='navbar mx-3 mt-2'>
            <div className="container-fluid">
                <a className='navbar-brand' href='#'>
                <img src={ logo } className="img-fluid w-50" alt="placeholder"/>
                </a>
                <Link to='/login' className="link">
                    <button className="btn btn-lg btn-primary" type='submit'>Sign In</button>
                </Link>
                
            </div>
        </nav>
        <div className="container-fluid text-center text-white">
            <div className="row vh-75 align-items-center justify-content-center">
                <div className="col">
                    <div className='Header1'>Unlimited movies, TV shows, and more.</div>
                    <div className='Header2 mt-3'>Watch anywhere. Cancel anytime.</div>
                    <div className='Header3 mt-1'>
                    Ready to watch? Enter your email to create or restart your membership.
                    </div>
                    { !email ? (
                        <div className="userInput input-group w-50 mx-auto">
                            <input type='email' className='form-control rounded-0' placeholder='Email Address' aria-label="Email Address" aria-describedby="button-addon2" ref={emailRef}/>
                            <button className="btn px-4 rounded-0 text-white" type="button" id="button-addon2" onClick={handleStart}>Get Started</button>
                        </div>
                    ) : (
                        <form className="userInput input-group w-50 mx-auto">
                            <input type='username' className='form-control rounded-0' placeholder='Username' aria-label="Username" aria-describedby="button-addon2" ref={usernameRef}/>
                            <input type='password' className='form-control rounded-0' placeholder='Password' aria-label="Password" aria-describedby="button-addon2" ref={passwordRef}/>
                            <button className="btn px-4 rounded-0 text-white" type="button" id="button-addon2" onClick={handleFinish}>Submit</button>
                        </form>
                    )}
                </div>
            </div>
            
        </div>

    </div>
  )
}

export default Register