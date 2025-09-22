import React, { useContext, useState } from 'react';
import "./login.scss";
import { AuthContext } from '../../context/authContext/AuthContext';
import { login } from '../../context/authContext/apiCalls';

const Login = () => {
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const {isFetching, dispatch} = useContext(AuthContext);

    const handleLogin = (e) => {
        e.preventDefault();
        
        login({email,password}, dispatch);
    };
    //We pass in dispatch because our global context is a reducer which requires an initial state and dispatch(which handles actions I guess)
    //in this function we only grab isFetching from our global context, and use it, how do we grab others? maybe just more commas
    //we call the login function from apicalls and passdown the userInfo and the dispatch ACTION
    //Then inside login we use dispatch to update the current state of our user
    //Initially its login start, and success will update it to loginSuccess, which takes isFetching to false because its updated via dispatch
    //AuthReducer handles all our actions, we pass in type, which is defined in authactions, and depending on type we will update global dispatch
  return (
    <div className='login'>
        <form className="loginForm">
            <input type="text" placeholder="email" className="loginInput" onChange={(e) => setEmail(e.target.value)}/>
            <input type="password" placeholder='password' className="loginInput" onChange={(e) => setPassword(e.target.value)}/>
            <button className='loginButton' onClick={handleLogin} disabled={isFetching}>Login</button>
        </form>
    </div>
  )
}

export default Login