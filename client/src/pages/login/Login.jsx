import React, { useContext, useRef, useState } from 'react'
import logo from '../../components/header/DupeFlix.png';

import "./login.css";
import { AuthContext } from '../../authContext/AuthContext';
import { login } from '../../authContext/apiCalls';

const Login = () => {

    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const {dispatch, error} = useContext(AuthContext);

    const handleLogin = (e) => {
        e.preventDefault();
        login({email,password},dispatch)
        console.log("Error Status" + error)
    }

  return (
    <div className='login position-relative vw-100 vh-100 overflow-hidden'>
        <nav className='navbar mx-3 mt-2'>
            <div className="container-fluid">
                <a className='navbar-brand' href='#'>
                <img src={ logo } className="img-fluid w-50" alt="placeholder"/>
                </a>
            </div>
        </nav>
        <div className="container text-white">
                <div className="row vh-100 align-items-center justify-content-center">
                    <div className="col-4 px-4 py-5 h-50 mb-5">
                        <h1>Sign In</h1>
                        {error && <h6 className="text-danger">Incorrect Username or Password</h6>}
                        <input type='email' className='form-control bg-secondary' placeholder='Email or Phone Number' aria-label="Email or Phone Number" aria-describedby="button-addon2" onChange={(e)=>setEmail(e.target.value)}/>
                        <input type='password' className='form-control bg-secondary' placeholder='Password' aria-label="Password" aria-describedby="button-addon2" onChange={(e)=>setPassword(e.target.value)}/>
                        <button className="btn px-4 text-white" type="button" id="button-addon2" onClick={handleLogin}>Sign In</button>
                        <h5>New to Netflix? <b>Sign up now.</b></h5>
                        <small>
                            This page is protected by Google reCAPTCHA to ensure you're not a
                            bot. <b>Learn more</b>.
                            <br />
                            Login Information:<br />
                            UserName: "testUser" Password: "tester123"
                        </small>
                    </div>
                    
                </div>
        </div>
    </div>
  )
}

export default Login